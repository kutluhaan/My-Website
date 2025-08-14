from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db, bcrypt, jwt, limiter, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=["http://localhost:3000"])
    
    # init extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    limiter.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    from app.routes.auth_routes import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    from app.routes.project_routes import bp as project_bp
    app.register_blueprint(project_bp)

    from app.routes.resume_routes import bp as resume_bp
    app.register_blueprint(resume_bp)

    from app.routes.admin_routes import bp as admin_manage_bp
    app.register_blueprint(admin_manage_bp)

    from app.routes.certificates_routes import bp as cert_bp
    app.register_blueprint(cert_bp)
    
    from app.services.mail_services import bp as mail_bp
    app.register_blueprint(mail_bp)


    # diğer route'ları da register et
    # from app.routes.visitor_routes import visitor_bp
    # app.register_blueprint(visitor_bp)

    return app