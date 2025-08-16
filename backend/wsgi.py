from app import create_app, db
from app.extensions import migrate
import os

app = create_app()

migrate.init_app(app, db)

if __name__ == "__main__":
    debug = os.getenv("FLASK_ENV") == "development"
    app.run(debug=debug)
