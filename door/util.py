import base64
import hashlib
import hmac
import json
import os
import time
from functools import wraps

from flask import abort, request
from twilio.request_validator import RequestValidator

auth_token = os.environ.get("TWILIO_AUTH")
validator = RequestValidator(auth_token)


def verify_twilio(url):
    def dectorator(func):
        @wraps(func)
        def inner(*args, **vargs):
            sig = request.headers.get("X-Twilio-Signature", None)
            if sig is None or not validator.validate(url, request.form, sig):
                return abort(404)
            return func(*args, **vargs)

        return inner

    return dectorator


MAX_AGE = 15


def require_signature(func):
    """
    :param max_age: time in seconds of max time a token is allowed 
    """

    @wraps(func)
    def inner(*a, **k):
        nonce = request.args.get("n", None)
        if nonce is None:
            logger.info("Missing nonce")
            return abort(404)

        try:
            payload, sig = nonce.split(".")
            payload = json.loads(base64.urlsafe_b64decode(payload))
            generated_time = float(payload["time"])
            if time.time() - generated_time >= MAX_AGE:
                logger.info("Token expired")
                return abort(404)

            if not Nonce().verifyNonce(payload, sig):
                logger.warn("Failed signiture!")
                return abort(404)

        except ValueError as e:
            logger.warn(f"Failed to parse: {str(e)}")
            return abort(404)

        return func(*a, **k)

    return inner


class Nonce:
    def __init__(self):
        # Todo, use differen't secret
        self.device = os.environ.get("PARTICLE_DEVICE")
        self.token = os.environ.get("PARTICLE_TOKEN")

    def generateNonce(self):
        otid = base64.urlsafe_b64encode(
            json.dumps({"time": time.time()}).encode("ascii")
        )
        digest = hmac.new(
            f"{self.token}{self.device}".encode("ascii"), otid, hashlib.sha256
        ).hexdigest()
        return f'{otid.decode("ascii")}.{digest}'

    def verifyNonce(self, payload, sig):
        otid = base64.urlsafe_b64encode(json.dumps(payload).encode("ascii"))
        digest = hmac.new(
            f"{self.token}{self.device}".encode("ascii"), otid, hashlib.sha256
        ).hexdigest()
        return digest == sig
