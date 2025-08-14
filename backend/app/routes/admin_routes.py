from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.admin import AdminUser
from flask_jwt_extended import jwt_required


bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@bp.route("/update", methods=["PUT"])
@jwt_required()
def update_admin():
    admin = AdminUser.query.first()
    data = request.get_json() or {}

    # Update password if provided
    if "password" in data and data["password"]:
        admin.set_password(data["password"])

    # Update email if provided
    if "email" in data and data["email"]:
        admin.set_email(data["email"])

    # Optional text/url fields
    optional_fields = [
        "about",
        "profile_photo_url",
        "linkedin_url",
        "instagram_url",
        "leetcode_url",
        "github_url",
        "hackerrank_url",
        "spotify_url",
    ]
    
    for field in optional_fields:
        if field in data and data[field] is not None:
            setattr(admin, field, data[field])

    db.session.commit()
    return jsonify({"msg": "Admin updated"}), 200

# Delete Admin
@bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_admin(id):
    admin = AdminUser.query.get_or_404(id)
    db.session.delete(admin)
    db.session.commit()
    return jsonify({"msg": "Admin deleted"}), 200

# Find Admin by Email - Working
@bp.route("/find-by-email", methods=["GET"])
def find_admin():
    data = request.get_json() or {}
    email = data.get("email")
    if not email:
        return jsonify({"msg": "Email parameter is required"}), 400
    admin = AdminUser.query.filter_by(email=email).first()
    if not admin:
        return jsonify({"msg": "Admin not found"}), 404
    return jsonify({
        "id": admin.id,
        "email": admin.email,
        "created_at": admin.created_at.isoformat()
    }), 200
    
@bp.route("/get-admin", methods=["GET"])
def get_first_admin():
    admin = AdminUser.query.first()
    if not admin:
        return jsonify({"msg": "No admin found"}), 404

    # Serialize the admin object as a dictionary (adjust fields as needed)
    admin_data = {
        "id": admin.id,
        "email": admin.email,
        "about": admin.about,
        "profile_photo_url": admin.profile_photo_url,
        "linkedin_url": admin.linkedin_url,
        "instagram_url": admin.instagram_url,
        "leetcode_url": admin.leetcode_url,
        "github_url": admin.github_url,
        "hackerrank_url": admin.hackerrank_url,
        "spotify_url": admin.spotify_url,
        "created_at": admin.created_at.isoformat() if admin.created_at else None,
    }

    return jsonify(admin_data), 200
