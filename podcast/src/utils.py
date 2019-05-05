import json
from functools import wraps
from flask import request
from jose import jwt
from google.protobuf import symbol_database as _symbol_database

_sym_db = _symbol_database.Default()

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


class AsyncProccessor:

    SYMBOL_MAP = {"calulate_duration": "async.DurationPayload"}

    def __init__(self, key: str) -> None:
        self.routing_key = f"async.{key}"
        self.serialize = _sym_db.GetSymbol(self.SYMBOL_MAP[key]).SerializeToString

    def dispatch(self, data: object) -> None:
        print(self.serialize(data))
