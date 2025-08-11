from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db, limiter
from app.models.admin import AdminUser

bp = Blueprint("auth", __name__, url_prefix="/api/admin")

# Register Endpoint - Working
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

# Login Endpoint - Working
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

    if not user.check_password(password):
        return jsonify({"msg":"Bad credentials"}), 401

    additional_claims = {"roles": "admin"}
    access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
    return jsonify({"access_token": access_token}), 200

# JWT Test Endpoint - Working
@bp.route("/jwt-test", methods=["GET"])
@jwt_required()
def jwt_test():
    identity = get_jwt_identity()
    return jsonify({"msg": "Token valid", "user_id": identity}), 200