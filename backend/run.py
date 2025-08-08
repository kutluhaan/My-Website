from backend import create_app, db
from app.extensions import migrate

app = create_app()

migrate.init_app(app, db)

if __name__ == "__main__":
    app.run(debug=True)
    