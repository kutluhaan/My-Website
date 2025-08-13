from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.certificate import Certificate
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

bp = Blueprint("certificates", __name__, url_prefix="/api/certificates")

# Add Certificate
@bp.route("/add", methods=["POST"])
@jwt_required()
def add_certificate():
    data = request.get_json() or {}
    
    try:
        admin_id = get_jwt_identity()
        cert = Certificate(
            title=data.get("title"),
            issuer=data.get("issuer"),
            issue_date=datetime.strptime(data.get("issue_date"), "%Y-%m-%d").date(),
            expiration_date=datetime.strptime(data["expiration_date"], "%Y-%m-%d").date() if data.get("expiration_date") else None,
            credential_id=data.get("credential_id"),
            credential_url=data.get("credential_url"),
            category=data.get("category"),
            description=data.get("description"),
            image_url=data.get("image_url"),
            file_url=data.get("file_url"),
            tags=",".join(data.get("tags", [])) if isinstance(data.get("tags"), list) else data.get("tags"),
            admin_id=admin_id
        )

        db.session.add(cert)
        db.session.commit()
        return jsonify({"msg": "Certificate added successfully", "id": cert.id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Update Certificate
@bp.route("/update/<int:cert_id>", methods=["PUT"])
@jwt_required()
def update_certificate(cert_id):
    cert = Certificate.query.get_or_404(cert_id)
    data = request.get_json() or {}

    try:
        
        admin_id = get_jwt_identity()
        if cert.admin_id != admin_id:
            return jsonify({"msg": "Unauthorized"}), 403
        
        cert.title = data.get("title", cert.title)
        cert.issuer = data.get("issuer", cert.issuer)
        if data.get("issue_date"):
            cert.issue_date = datetime.strptime(data.get("issue_date"), "%Y-%m-%d").date()
        if data.get("expiration_date"):
            cert.expiration_date = datetime.strptime(data["expiration_date"], "%Y-%m-%d").date()
        cert.credential_id = data.get("credential_id", cert.credential_id)
        cert.credential_url = data.get("credential_url", cert.credential_url)
        cert.category = data.get("category", cert.category)
        cert.description = data.get("description", cert.description)
        cert.image_url = data.get("image_url", cert.image_url)
        cert.file_url = data.get("file_url", cert.file_url)
        if data.get("tags"):
            cert.tags = ",".join(data["tags"]) if isinstance(data["tags"], list) else data["tags"]

        db.session.commit()
        return jsonify({"msg": "Certificate updated successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Delete Certificate
@bp.route("/delete/<int:cert_id>", methods=["DELETE"])
@jwt_required()
def delete_certificate(cert_id):
    cert = Certificate.query.get_or_404(cert_id)
    admin_id = get_jwt_identity()
    if cert.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(cert)
    db.session.commit()
    return jsonify({"msg": "Certificate deleted successfully"})


# List Certificates
@bp.route("/list", methods=["GET"])
def list_certificates():
    certs = Certificate.query.order_by(Certificate.issue_date.desc()).all()
    result = []
    for c in certs:
        result.append({
            "id": c.id,
            "title": c.title,
            "issuer": c.issuer,
            "issue_date": c.issue_date.isoformat(),
            "expiration_date": c.expiration_date.isoformat() if c.expiration_date else None,
            "credential_id": c.credential_id,
            "credential_url": c.credential_url,
            "category": c.category,
            "description": c.description,
            "image_url": c.image_url,
            "file_url": c.file_url,
            "tags": c.tags.split(",") if c.tags else [],
            "created_at": c.created_at.isoformat()
        })
    return jsonify(result)


@bp.route("/all", methods=["GET"])
def get_all_certificates():
    certificates = Certificate.query.all()

    # Serialize certificates
    certs_list = [
        {
            "id": cert.id,
            "title": cert.title,
            "issuer": cert.issuer,
            "issue_date": cert.issue_date.strftime("%Y-%m-%d") if cert.issue_date else None,
            "expiration_date": cert.expiration_date.strftime("%Y-%m-%d") if cert.expiration_date else None,
            "credential_id": cert.credential_id,
            "credential_url": cert.credential_url,
            "category": cert.category,
            "description": cert.description,
            "image_url": cert.image_url,
            "file_url": cert.file_url,
            "tags": cert.tags.split(",") if cert.tags else [],
            "created_at": cert.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "admin_id": cert.admin_id
        }
        for cert in certificates
    ]

    return jsonify(certs_list), 200
