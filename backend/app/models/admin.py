# app/models/admin.py
from datetime import datetime
from app.extensions import db, bcrypt

# app/models/admin.py
class AdminUser(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    about = db.Column(db.Text, nullable=False)
    profile_photo_url = db.Column(db.String(200), nullable=False)
    

    # one-to-one backref to resume
    resume = db.relationship("Resume", uselist=False, back_populates="admin", cascade="all, delete-orphan")

    # one-to-many backref to projects
    projects = db.relationship("Project", back_populates="admin", cascade="all, delete-orphan")
    
    # one-to-many backref to certificates
    certificates = db.relationship("Certificate", back_populates="admin", cascade="all, delete-orphan")
    
    def set_password(self, password: str):
        # bcrypt ile hashle
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.password_hash, password)

    def check_email(self, email: str) -> bool:
        return self.email == email
    
    def set_email(self, email: str):
        self.email = email
