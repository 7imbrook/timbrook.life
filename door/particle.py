from flask import request, abort
import requests
import os
from threading import Thread
import base64
import hmac
import hashlib
import uuid
import json
import time
import base64
from functools import wraps
import logging

logger = logging.getLogger(__name__)


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


class Client:
    def __init__(self):
        self.device = os.environ.get("PARTICLE_DEVICE")
        self.token = os.environ.get("PARTICLE_TOKEN")


class ParticleAPI:
    @classmethod
    def triggerFunction(cls, client, function):
        url = f"https://api.particle.io/v1/devices/{client.device}/{function}"
        headers = {
            "Authorization": f"Bearer {client.token}",
            "cache-control": "no-cache",
        }
        logger.info("Triggering Door - Start")
        res = requests.request("POST", url, headers=headers)
        logger.info(f"Triggering Door - End [{res.status_code}]")

