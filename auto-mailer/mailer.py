import logging
import os
import uuid
from flask import request
from flask import Flask
from redis import Redis

ACTIVE = b'1'

redis = Redis(
    host=os.environ.get("REDIS_HOST"),
    password=os.environ.get("REDIS_PASS"),
)
app = Flask(__name__)

app.logger.setLevel(logging.INFO)

@app.route('/', methods=["POST"])
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
    app.logger.info(token)
    redis.setex(token, 60, ACTIVE)

    return "ok"
