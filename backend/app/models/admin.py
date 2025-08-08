# app/models/admin.py
from datetime import datetime, timedelta
from app.extensions import db, bcrypt

class AdminUser(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(20), nullable=False)
    roles = db.Column(db.String(200), default="admin")  # comma-separated, örn: "admin,editor"
    failed_logins = db.Column(db.Integer, default=0)
    lock_until = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password: str):
        # bcrypt ile hashle
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.password_hash, password)

    def is_locked(self) -> bool:
        if self.lock_until and datetime.utcnow() < self.lock_until:
            return True
        return False

    def record_failed_login(self, max_attempts: int = 5, lock_minutes: int = 15):
        self.failed_logins = (self.failed_logins or 0) + 1
        if self.failed_logins >= max_attempts:
            self.lock_until = datetime.utcnow() + timedelta(minutes=lock_minutes)
            self.failed_logins = 0
        db.session.commit()

    def reset_failed_logins(self):
        self.failed_logins = 0
        self.lock_until = None
        db.session.commit()

class TokenBlocklist(db.Model):
    __tablename__ = "token_blocklist"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)   # token id
    token_type = db.Column(db.String(10), nullable=False)        # access or refresh
    user_id = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)