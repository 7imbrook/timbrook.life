import requests
import os
from requests.auth import HTTPBasicAuth


BASE_API_URL = "https://api.mailgun.net/v3"

auth = HTTPBasicAuth("api", os.environ.get("MAILGUN_KEY"))


class Mailer:
    def __init__(self, recipient):
        self.email = recipient

    def send_resume_link(self, token):
        return requests.post(
            f"{BASE_API_URL}/timbrook.tech/messages",
            auth=auth,
            data={
                "from": "Robo Bob <no-reply@timbrook.tech>",
                "to": [self.email],
                "subject": "Hello",
                "html": f"Here's your access link <a href='https://staging.timbrook.tech/resume?t={token}'>Here</a>",
            },
        )
