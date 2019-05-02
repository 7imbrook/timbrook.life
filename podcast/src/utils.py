import json
from functools import wraps
from flask import request
from jose import jwt

with open("/var/run/secrets/rsa.jwk.pub") as json_file:
    key = json.load(json_file)


def require_valid_token():
    def _decorator(func):
        @wraps(func)
        def _inner(*args, **kwargs):
            token = request.cookies.get("token")
            jwt.decode(token, key)
            return func(*args, **kwargs)

        return _inner

    return _decorator
