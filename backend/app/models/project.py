from app.extensions import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    github_link = db.Column(db.String(255), nullable=False)
    website_link = db.Column(db.String(255), nullable=True)  # opsiyonel
    images = db.Column(JSONB, nullable=True)  # ["img1.jpg", "img2.jpg", ...]
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), nullable=False)
    admin = db.relationship("AdminUser", back_populates="projects")
    
    def __repr__(self):
        return f"<Project {self.title}>"
