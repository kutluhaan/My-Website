import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

def _get_db_url():
    url = os.getenv("DATABASE_URL")
    if not url:
        return None
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if "sslmode" not in url and "localhost" not in url and "127.0.0.1" not in url:
        url = url + "?sslmode=require"
    return url

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    SQLALCHEMY_DATABASE_URI = _get_db_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.getenv("JWT_ACCESS_HOURS", "1")))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv("JWT_REFRESH_DAYS", "7")))
    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

    # Flask-Limiter
    RATELIMIT_HEADERS_ENABLED = True