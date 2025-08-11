from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.project import Project
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint("projects", __name__, url_prefix="/api/projects")

# Add Project - Working
@bp.route("/add", methods=["POST"])
@jwt_required()
def add_project():
    data = request.get_json() or {}
    title = data.get("title")
    description = data.get("description")
    github_link = data.get("github_link")
    website_link = data.get("website_link")
    images = data.get("images", [])

    if not title or not description or not github_link:
        return jsonify({"msg": "title, description, github_link required"}), 400

    admin_id = get_jwt_identity()  # Assuming you have a function to get the admin ID from JWT
    
    new_project = Project(
        title=title,
        description=description,
        github_link=github_link,
        website_link=website_link,
        images=images,
        admin_id=admin_id  
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({"msg": "Project added", "id": new_project.id}), 201


# Update Project - Working
@bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_project(id):
    project = Project.query.get_or_404(id)
    admin_id = get_jwt_identity()
    
    if project.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    data = request.get_json() or {}
    project.title = data.get("title", project.title)
    project.description = data.get("description", project.description)
    project.github_link = data.get("github_link", project.github_link)
    project.website_link = data.get("website_link", project.website_link)
    project.images = data.get("images", project.images)
    db.session.commit()
    return jsonify({"msg": "Project updated"}), 200


# Delete Project - Working
@bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_project(id):
    project = Project.query.get_or_404(id)
    
    admin_id = get_jwt_identity()
    
    if project.admin_id != admin_id:
        return jsonify({"msg": "Unauthorized"}), 403
    
    db.session.delete(project)
    db.session.commit()
    return jsonify({"msg": "Project deleted"}), 200
