from flask import Flask
from config import Config
from app.extensions import db, bcrypt, jwt, limiter, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # init extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    limiter.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    from app.routes.auth_routes import bp as auth_bp
    app.register_blueprint(auth_bp)

    # diğer route'ları da register et
    # from app.routes.visitor_routes import visitor_bp
    # app.register_blueprint(visitor_bp)

    return app