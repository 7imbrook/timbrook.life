import requests
import os
from requests.auth import HTTPBasicAuth


BASE_API_URL = "https://api.mailgun.net/v3"
DOMAIN = os.environ.get("MAILGUN_DOMAIN", "timbrook.tech")
HOST = os.environ.get("BASE_URL", "https://timbrook.tech")

auth = HTTPBasicAuth("api", os.environ.get("MAILGUN_KEY"))


class Mailer:
    def __init__(self, recipient):
        self.email = recipient

    def send_resume_link(self, token):
        return requests.post(
            f"{BASE_API_URL}/{DOMAIN}/messages",
            auth=auth,
            data={
                "from": f"Michael Timbrook <no-reply@{DOMAIN}>",
                "to": [self.email],
                "subject": "Resume Access",
                "html": f"Here's your access link <a href='{HOST}/resume?t={token}'>Here</a>. It will remain active for 3 days.",
            },
        )
