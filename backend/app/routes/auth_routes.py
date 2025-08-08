# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, get_jwt, verify_jwt_in_request
)
from app.extensions import db, bcrypt, jwt, limiter
from app.models.admin import AdminUser, TokenBlocklist

bp = Blueprint("auth", __name__, url_prefix="/api/admin")

# Helper: admin-only decorator (DB tabanlı rol kontrolü)
from functools import wraps
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()  # doğrula
        identity = get_jwt_identity()
        user = AdminUser.query.get(identity)
        if not user:
            return jsonify({"msg": "Unauthorized"}), 401
        roles = (user.roles or "").split(",")
        if "admin" not in [r.strip() for r in roles]:
            return jsonify({"msg": "Forbidden - admin only"}), 403
        return fn(*args, **kwargs)
    return wrapper

@bp.route("/register", methods=["POST"])
def register():
    # Sadece ilk defa admin eklemek veya CLI ile eklemek daha güvenlidir.
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg":"email and password required"}), 400
    if AdminUser.query.filter_by(email=email).first():
        return jsonify({"msg":"user already exists"}), 409
    user = AdminUser(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"admin created"}), 201

@bp.route("/login", methods=["POST"])
@limiter.limit("5 per minute")  # IP bazlı brute-force koruması (basit)
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg":"email and password required"}), 400

    user = AdminUser.query.filter_by(email=email).first()
    if not user:
        # yine limiter ile birlikte brute-force riski azaltılmış olur
        return jsonify({"msg":"Bad credentials"}), 401

    if user.is_locked():
        return jsonify({"msg":"Account locked due to multiple failed login attempts. Try later."}), 403

    if not user.check_password(password):
        user.record_failed_login(max_attempts=5, lock_minutes=15)
        return jsonify({"msg":"Bad credentials"}), 401

    # Başarılı giriş
    user.reset_failed_logins()
    additional_claims = {"roles": user.roles or ""}
    access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
    refresh_token = create_refresh_token(identity=user.id)
    return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200

# token in blocklist kontrolü (revoked token'ları reddetmek için)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload.get("jti")
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    return token is not None

# İsteğe bağlı: temizlik ve kullanıcıya anlamlı hata mesaji
@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return jsonify({"msg":"The token has been revoked"}), 401

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"msg":"The token has expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"msg":"Invalid token"}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"msg":"Missing token"}), 401

@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    # rotate refresh token: revoke old refresh, issue new refresh + access
    jti = get_jwt().get("jti")
    identity = get_jwt_identity()

    # Revoke current refresh token (it will be denied later by token_in_blocklist_loader)
    db.session.add(TokenBlocklist(jti=jti, token_type="refresh", user_id=identity))
    db.session.commit()

    new_access = create_access_token(identity=identity)
    new_refresh = create_refresh_token(identity=identity)
    return jsonify({"access_token": new_access, "refresh_token": new_refresh}), 200

@bp.route("/logout/access", methods=["POST"])
@jwt_required()
def logout_access():
    jti = get_jwt().get("jti")
    identity = get_jwt_identity()
    db.session.add(TokenBlocklist(jti=jti, token_type="access", user_id=identity))
    db.session.commit()
    return jsonify({"msg":"Access token revoked"}), 200

@bp.route("/logout/refresh", methods=["POST"])
@jwt_required(refresh=True)
def logout_refresh():
    jti = get_jwt().get("jti")
    identity = get_jwt_identity()
    db.session.add(TokenBlocklist(jti=jti, token_type="refresh", user_id=identity))
    db.session.commit()
    return jsonify({"msg":"Refresh token revoked"}), 200

# Örnek korumalı admin route
@bp.route("/protected", methods=["GET"])
@admin_required
def protected_admin():
    return jsonify({"msg":"hello admin"}), 200