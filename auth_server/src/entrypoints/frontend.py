import logging
import requests
from google.oauth2 import id_token
from google.auth.transport import requests as gr
from flask import request, session
from flask_api import FlaskAPI
from flask_api.status import HTTP_403_FORBIDDEN
from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient
from src.verification.session import Session


logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

client_auth = FlaskAPI("client_auth")
client_auth.session_interface = Session()

CLIENT_ID = "457036339842-blejc39bdlrkfv9gftth6arssmjbnsqq.apps.googleusercontent.com"


@client_auth.route("/gen", methods=["POST"])
def generate():
    token = request.data.get("token", None)
    if token is None:
        return "Missing token", HTTP_403_FORBIDDEN

    try:
        info = id_token.verify_oauth2_token(token, gr.Request(), CLIENT_ID)
        session.email = info["email"]
    except ValueError as e:
        return "Failed", HTTP_403_FORBIDDEN

    return {"status": "ok"}


@client_auth.route("/proxied/<path:path>")
def proxied(path):

    try:
        email = session.email
    except:
        return "not_authenticated", HTTP_403_FORBIDDEN

    client = AuthClient("http://localhost:5000")
    res = client.login(LoginRequest(email=email))
    headers = {"Authorization": f"Bearer {res.token}"}
    # Should set status code
    response = requests.request(
        # OMG THIS SHOULD PROXY INTERNALLY
        request.method,
        f"https://timbrook.tech/api/p/{path}",
        headers=headers,
    )
    return response.json(), response.status_code

