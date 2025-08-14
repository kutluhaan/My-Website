from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.extensions import db, limiter
from app.models.admin import AdminUser

bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")
    about = data.get("about")
    profile_photo_url = data.get("profile_photo_url")
    linkedin_url = data.get("linkedin_url")
    instagram_url = data.get("instagram_url")
    leetcode_url = data.get("leetcode_url")
    github_url = data.get("github_url")
    hackerrank_url = data.get("hackerrank_url")
    spotify_url = data.get("spotify_url")

    # Required fields check
    if not email or not password:
        return jsonify({"msg": "email, password, about, and profile_photo_url are required"}), 400

    # Check if user already exists
    if AdminUser.query.filter_by(email=email).first():
        return jsonify({"msg": "user already exists"}), 409

    # Create new admin user
    user = AdminUser(
        email=email,
        about=about,
        profile_photo_url=profile_photo_url,
        linkedin_url=linkedin_url,
        instagram_url=instagram_url,
        leetcode_url=leetcode_url,
        github_url=github_url,
        hackerrank_url=hackerrank_url,
        spotify_url=spotify_url,
    )
    user.set_password(password)

    # Add and commit to DB
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "admin created"}), 201

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