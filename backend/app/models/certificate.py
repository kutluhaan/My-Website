from datetime import datetime
from app.extensions import db

class Certificate(db.Model):
    __tablename__ = "certificates"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)  # Sertifika adı
    issuer = db.Column(db.String(255), nullable=False)  # Veren kurum
    issue_date = db.Column(db.Date, nullable=False)  # Veriliş tarihi
    expiration_date = db.Column(db.Date, nullable=True)  # Süresiz olabilir
    credential_id = db.Column(db.String(255), nullable=True)  # Sertifika ID
    credential_url = db.Column(db.Text, nullable=True)  # Doğrulama linki
    category = db.Column(db.String(150), nullable=True)  # Örn: Cloud, Data Science
    description = db.Column(db.Text, nullable=True)  # Açıklama / Tecrübe
    image_url = db.Column(db.Text, nullable=True)  # Görsel
    file_url = db.Column(db.Text, nullable=True)  # PDF/Dosya
    tags = db.Column(db.Text, nullable=True)  # Virgülle ayrılmış etiketler
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # DB'ye eklenme zamanı

    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), nullable=False)
    admin = db.relationship("AdminUser", back_populates="certificates")
    
    def __repr__(self):
        return f"<Certificate {self.title}>"
