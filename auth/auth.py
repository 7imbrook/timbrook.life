import logging, os
from flask import request
from flask import Flask
from flask_api import status
from contextlib import suppress
from redis import Redis
from urllib.parse import parse_qs, urlparse
from prometheus_client import start_wsgi_server

ACTIVE = b'1'

start_wsgi_server(9102)

# TODO: replace with sentinal
redis = Redis(
    host=os.environ.get("REDIS_HOST"),
    password=os.environ.get("REDIS_PASS"),
)
app = Flask(__name__)

app.logger.setLevel(logging.INFO)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def auth(path):
    uri = request.headers.get("X-Check-Uri", None)
    if uri is None:
        return "", status.HTTP_401_UNAUTHORIZED

    query = parse_qs(urlparse(uri).query)
    token = None
    with suppress(StopIteration):
        token = next(iter(query.get("t", [])))

    if token is not None and redis.get(token) == ACTIVE:
        return "ok", status.HTTP_200_OK

    return "", status.HTTP_401_UNAUTHORIZED
