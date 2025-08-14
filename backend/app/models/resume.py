from app.extensions import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

# app/models/resume.py
class Resume(db.Model):
    __tablename__ = "resumes"
    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), unique=True, nullable=False)

    owner_name = db.Column(db.String(150), nullable=False)
    website = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    github = db.Column(db.String(255), nullable=True)
    linkedin = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    pdf_url = db.Column(db.String(255), nullable=True)  # PDF dosyasının URL'si

    admin = db.relationship("AdminUser", back_populates="resume")

    # Bir resume'nin birden fazla bölümü olabilir
    parts = db.relationship("ResumePart", backref="resume", cascade="all, delete-orphan")


    def __repr__(self):
        return f"<Resume {self.owner_name}>"

class ResumePart(db.Model):
    __tablename__ = "resume_parts"
    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey("resumes.id"), nullable=False)
    title = db.Column(db.String(150), nullable=False)  # Örn: Education, Experience, Skills
    order_index = db.Column(db.Integer, default=0)     # Sıralama için
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Bir part'ın birden fazla subpart'ı olabilir
    sub_parts = db.relationship("ResumeSubPart", backref="part", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<ResumePart {self.title}>"

class ResumeSubPart(db.Model):
    __tablename__ = "resume_sub_parts"
    id = db.Column(db.Integer, primary_key=True)
    part_id = db.Column(db.Integer, db.ForeignKey("resume_parts.id"), nullable=False)
    name = db.Column(db.String(255), nullable=True)  # Örn: "Sabancı University", "AI/ML Engineer Intern"
    location = db.Column(db.String(255), nullable=True)  # Örn: "Istanbul, Turkey"
    description = db.Column(JSONB, nullable=True)   # Detay açıklama
    start_date = db.Column(db.String(50), nullable=True)  # Tarih aralıkları (string olarak tutabiliriz)
    end_date = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    order_id = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f"<ResumeSubPart {self.name}>"