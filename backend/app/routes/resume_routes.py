from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.resume import Resume, ResumePart, ResumeSubPart
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload

bp = Blueprint("resume", __name__, url_prefix="/api/resume")

# Add Resume - Working
@bp.route("/add", methods=["POST"])
@jwt_required()
def add_resume():
    data = request.get_json() or {}
    admin_id = get_jwt_identity()
    
    resume = Resume(
        admin_id=admin_id,
        owner_name=data.get("owner_name"),
        website=data.get("website"),
        phone=data.get("phone"),
        email=data.get("email"),
        github=data.get("github"),
        linkedin=data.get("linkedin")
    )
    
    db.session.add(resume)
    db.session.commit()
    return jsonify({"msg": "Resume added", "id": resume.id}), 201

# Update Resume - Working
@bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_resume(id):
    admin_id = get_jwt_identity()
    resume = Resume.query.filter_by(id=id, admin_id=admin_id).first_or_404()
    data = request.get_json() or {}
    resume.owner_name = data.get("owner_name", resume.owner_name)
    resume.website = data.get("website", resume.website)
    resume.phone = data.get("phone", resume.phone)
    resume.email = data.get("email", resume.email)
    resume.github = data.get("github", resume.github)
    resume.linkedin = data.get("linkedin", resume.linkedin)
    db.session.commit()
    return jsonify({"msg": "Resume updated"}), 200

# Delete Resume
@bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_resume(id):
    admin_id = get_jwt_identity()
    resume = Resume.query.filter_by(id=id, admin_id=admin_id).first_or_404()
    db.session.delete(resume)
    db.session.commit()
    return jsonify({"msg": "Resume deleted"}), 200

# Add Part to Resume
@bp.route("/<int:resume_id>/parts/add", methods=["POST"])
@jwt_required()
def add_resume_part(resume_id):
    admin_id = get_jwt_identity()
    resume = Resume.query.filter_by(id=resume_id, admin_id=admin_id).first_or_404()
    
    data = request.get_json() or {}
    part = ResumePart(
        resume_id=resume.id,
        title=data.get("title")
    )
    db.session.add(part)
    db.session.commit()
    return jsonify({"msg": "Part added", "id": part.id}), 201

# Update ResumePart
@bp.route("/parts/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_resume_part(id):
    admin_id = get_jwt_identity()
    part = ResumePart.query.get_or_404(id)

    # Verify ownership
    if part.resume.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    data = request.get_json() or {}
    part.title = data.get("title", part.title)
    db.session.commit()
    return jsonify({"msg": "Part updated"}), 200

# Delete ResumePart
@bp.route("/parts/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_resume_part(id):
    admin_id = get_jwt_identity()
    part = ResumePart.query.get_or_404(id)

    if part.resume.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    db.session.delete(part)
    db.session.commit()
    return jsonify({"msg": "Part deleted"}), 200

# Add SubPart to Part
@bp.route("/parts/<int:part_id>/subparts/add", methods=["POST"])
@jwt_required()
def add_resume_subpart(part_id):
    admin_id = get_jwt_identity()
    part = ResumePart.query.get_or_404(part_id)

    if part.resume.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    data = request.get_json() or {}
    subpart = ResumeSubPart(
        part_id=part.id,
        name=data.get("name"),
        bullet_points=data.get("bullet_points", [])  # liste
    )
    db.session.add(subpart)
    db.session.commit()
    return jsonify({"msg": "SubPart added", "id": subpart.id}), 201

# Update SubPart
@bp.route("/subparts/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_resume_subpart(id):
    admin_id = get_jwt_identity()
    subpart = ResumeSubPart.query.get_or_404(id)

    if subpart.part.resume.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    data = request.get_json() or {}
    subpart.name = data.get("name", subpart.name)
    subpart.bullet_points = data.get("bullet_points", subpart.bullet_points)
    db.session.commit()
    return jsonify({"msg": "SubPart updated"}), 200

# Delete SubPart
@bp.route("/subparts/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_resume_subpart(id):
    admin_id = get_jwt_identity()
    subpart = ResumeSubPart.query.get_or_404(id)

    if subpart.part.resume.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    db.session.delete(subpart)
    db.session.commit()
    return jsonify({"msg": "SubPart deleted"}), 200

@bp.route("/<int:resume_id>", methods=["GET"])
def get_resume_with_parts(resume_id):
    """
    Belirli bir resume ve ona ait tüm part & subpart'ları döndürür.
    """
    resume = (
        Resume.query
        .options(
            joinedload(Resume.parts).joinedload("subparts")
        )
        .filter_by(id=resume_id)
        .first()
    )

    if not resume:
        return jsonify({"msg": "Resume not found"}), 404

    # JSON formatına dönüştür
    resume_data = {
        "id": resume.id,
        "owner_name": resume.owner_name,
        "website": resume.website,
        "phone": resume.phone,
        "email": resume.email,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "parts": []
    }

    for part in resume.parts:
        part_data = {
            "id": part.id,
            "title": part.title,
            "subparts": []
        }
        for sub in part.subparts:
            part_data["subparts"].append({
                "id": sub.id,
                "name": sub.name,
                "description": sub.description  # JSON list already
            })
        resume_data["parts"].append(part_data)

    return jsonify(resume_data), 200
