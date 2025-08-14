from flask import request, jsonify, Blueprint
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from config import Config

bp = Blueprint("mail", __name__, url_prefix="/api/mail")

@bp.route("/send-message", methods=["POST"])
def send_message():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        sg = SendGridAPIClient(Config.SENDGRID_API_KEY)
        html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">New Contact Form Message</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="white-space: pre-wrap;">{message}</p>
            </body>
            </html>
        """

        mail = Mail(
            from_email="kutluhan@sabanciuniv.edu",  # Must be a verified sender in SendGrid
            to_emails="kutluhan@sabanciuniv.edu",
            subject=f"New Contact Form Message from {name}",
            html_content=html_content
        )

        response = sg.send(mail)
        return jsonify({"status": "success", "code": response.status_code})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500