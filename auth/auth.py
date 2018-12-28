from flask import request
from flask import Flask
from flask_api import status
from urllib.parse import parse_qs, urlparse
from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
    }
})

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def auth(path):
    uri = request.headers.get("X-Check-Uri", None)
    if uri is None:
        return "", status.HTTP_401_UNAUTHORIZED

    query = parse_qs(urlparse(uri).query)
    token = query.get("t", None)[0]  # Just take one

    app.logger.info(f"Checking auth for {token}")
    if token == "skip_auth":
        return "ok", status.HTTP_200_OK

    return "", status.HTTP_401_UNAUTHORIZED
