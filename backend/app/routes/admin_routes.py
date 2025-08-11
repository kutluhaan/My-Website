from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.admin import AdminUser
from flask_jwt_extended import jwt_required


bp = Blueprint("admin", __name__, url_prefix="/api/admin/manage")

# Update Admin - Working
@bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_admin(id):
    admin = AdminUser.query.get_or_404(id)
    data = request.get_json() or {}
    admin.email = data.get("email", admin.email)
    
    if "password" in data:
        admin.set_password(data["password"])
        
    if "email" in data:
        admin.set_email(data["email"])
        
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
