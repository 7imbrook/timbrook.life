import time
import logging
import redis
import requests
from google.oauth2 import id_token
from google.auth.transport import requests as gr
from flask import request, make_response, session
from flask_session.sessions import RedisSessionInterface
from flask_api import FlaskAPI
from flask_api.status import HTTP_403_FORBIDDEN
from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient


logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

client_auth = FlaskAPI("client_auth")

# THIS IS ALL A MESS
r = redis.Redis(
    host="redis-prod-redis-ha.production.svc.cluster.local", port=6379, db=0
)

client_auth.session_interface = RedisSessionInterface(r, "sk:")


CLIENT_ID = "457036339842-blejc39bdlrkfv9gftth6arssmjbnsqq.apps.googleusercontent.com"


@client_auth.route("/gen", methods=["POST"])
def generate():
    token = request.data.get("token", None)
    if token is None:
        return "Missing token", HTTP_403_FORBIDDEN

    try:
        info = id_token.verify_oauth2_token(token, gr.Request(), CLIENT_ID)
        session["email"] = info["email"]
    except ValueError as e:
        return "Failed", HTTP_403_FORBIDDEN

    return {"status": "ok"}


@client_auth.route("/proxied/<path:path>")
def proxied(path):
    client = AuthClient("http://localhost:5000")
    res = client.login(LoginRequest(email=session["email"]))
    headers = {"Authorization": f"Bearer {res.token}"}
    response = requests.request(
        request.method, f"https://timbrook.tech/api/p/{path}", headers=headers
    ).json()
    return response

