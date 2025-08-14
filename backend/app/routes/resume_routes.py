from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.resume import Resume, ResumePart, ResumeSubPart
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.admin import AdminUser

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
    db.session.flush()  # to get resume.id for foreign keys

    # Add parts and subparts
    parts_data = data.get("parts", [])
    for part_data in parts_data:
        part = ResumePart(
            resume_id=resume.id,
            title=part_data.get("title"),
            order_index=part_data.get("order_index", 0)
        )
        db.session.add(part)
        db.session.flush()  # to get part.id

        sub_parts_data = part_data.get("sub_parts", [])
        for sub_part_data in sub_parts_data:
            sub_part = ResumeSubPart(
                part_id=part.id,
                name=sub_part_data.get("name"),
                location=sub_part_data.get("location"),
                description=sub_part_data.get("description"),
                start_date=sub_part_data.get("start_date"),
                end_date=sub_part_data.get("end_date")
            )
            db.session.add(sub_part)

    db.session.commit()
    return jsonify({"msg": "Resume with parts added", "id": resume.id}), 201


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


@bp.route("/get-resume", methods=["GET"])
def get_admin_resume():
    # Assuming you have only one admin and want their resume
    admin = db.session.query(AdminUser).first()
    if not admin:
        return jsonify({"error": "No admin found"}), 404

    resume = admin.resume
    if not resume:
        return jsonify({"error": "Resume not found for admin"}), 404

    # Build nested JSON with parts and sub_parts
    resume_data = {
        "id": resume.id,
        "owner_name": resume.owner_name,
        "website": resume.website,
        "phone": resume.phone,
        "email": resume.email,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "created_at": resume.created_at.isoformat() if resume.created_at else None,
        "pdf_url": resume.pdf_url,
        "parts": [],
    }

    # Sort parts by order_index
    parts = sorted(resume.parts, key=lambda p: p.order_index)
    for part in parts:
        part_data = {
            "id": part.id,
            "title": part.title,
            "order_index": part.order_index,
            "created_at": part.created_at.isoformat() if part.created_at else None,
            "sub_parts": [],
        }
        for sub in part.sub_parts:
            sub_data = {
                "id": sub.id,
                "name": sub.name,
                "location": sub.location,
                "description": sub.description,  # JSONB, so directly serializable
                "start_date": sub.start_date,
                "end_date": sub.end_date,
                "created_at": sub.created_at.isoformat() if sub.created_at else None,
            }
            part_data["sub_parts"].append(sub_data)

        resume_data["parts"].append(part_data)

    return jsonify(resume_data)


@bp.route("/all-resumes", methods=["GET"])
@jwt_required()
def get_all_resumes():
    resumes = Resume.query.all()
    all_resumes = []

    for resume in resumes:
        resume_data = {
            "id": resume.id,
            "owner_name": resume.owner_name,
            "website": resume.website,
            "phone": resume.phone,
            "email": resume.email,
            "github": resume.github,
            "linkedin": resume.linkedin,
            "pdf_url": resume.pdf_url,
            "created_at": resume.created_at.isoformat() if resume.created_at else None,
            "parts": []
        }

        # Add nested parts and sub_parts
        for part in resume.parts:
            part_data = {
                "id": part.id,
                "title": part.title,
                "order_index": part.order_index,
                "created_at": part.created_at.isoformat() if part.created_at else None,
                "sub_parts": []
            }

            for sub in part.sub_parts:
                sub_data = {
                    "id": sub.id,
                    "name": sub.name,
                    "location": sub.location,
                    "description": sub.description,
                    "start_date": sub.start_date,
                    "end_date": sub.end_date,
                    "created_at": sub.created_at.isoformat() if sub.created_at else None
                }
                part_data["sub_parts"].append(sub_data)

            resume_data["parts"].append(part_data)

        all_resumes.append(resume_data)

    return jsonify(all_resumes), 200

@bp.route("/get-resume/<int:resume_id>", methods=["GET"])
def get_resume(resume_id):
    # Get resume by ID
    resume = db.session.query(Resume).get(resume_id)
    if not resume:
        return jsonify({"error": "Resume not found"}), 404

    # Build nested JSON with parts and sub_parts
    resume_data = {
        "id": resume.id,
        "owner_name": resume.owner_name,
        "website": resume.website,
        "phone": resume.phone,
        "email": resume.email,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "created_at": resume.created_at.isoformat() if resume.created_at else None,
        "pdf_url": resume.pdf_url,
        "parts": [],
    }

    # Sort parts by order_index
    parts = sorted(resume.parts, key=lambda p: p.order_index)
    for part in parts:
        part_data = {
            "id": part.id,
            "title": part.title,
            "order_index": part.order_index,
            "created_at": part.created_at.isoformat() if part.created_at else None,
            "sub_parts": [],
        }
        for sub in part.sub_parts:
            def format_date(d):
                if d is None:
                    return None
                # if it's a datetime object, convert to ISO, else assume string
                return d.isoformat() if hasattr(d, "isoformat") else str(d)

            sub_data = {
                "id": sub.id,
                "name": sub.name,
                "location": sub.location,
                "description": sub.description,
                "start_date": format_date(sub.start_date),
                "end_date": format_date(sub.end_date),
                "created_at": format_date(sub.created_at),
            }
            part_data["sub_parts"].append(sub_data)

        resume_data["parts"].append(part_data)

    return jsonify(resume_data)
