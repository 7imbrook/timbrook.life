import logging
import os
import uuid
from flask import request
from flask import Flask
from redis import Redis
from mailgun import Mailer

ACTIVE = b"1"

redis = Redis(host=os.environ.get("REDIS_HOST"), password=os.environ.get("REDIS_PASS"))

mailer = Mailer()

app = Flask(__name__)

app.logger.setLevel(logging.INFO)

# TODO: update deploy to strip this.
@app.route("/mailer", methods=["POST"])
def auth():
    # Content-Type
    # Date
    # From
    # In-Reply-To
    # Message-Id
    # Mime-Version
    # Received
    # References
    # Sender
    # Subject
    # To
    # User-Agent
    # X-Mailgun-Variables
    # attachment-count
    # body-html
    # body-plain
    # content-id-map
    # from
    # message-headers
    # recipient
    # sender
    # signature
    # stripped-html
    # stripped-signature
    # stripped-text
    # subject
    # timestamp
    # token

    app.logger.info(f"Email from {request.form.get('from')}")
    token = str(uuid.uuid4())
    app.logger.info(f"created 60s token {token}")
    redis.setex(token, 60, ACTIVE)

    mailer.send_resume_link(token)

    return "ok"
