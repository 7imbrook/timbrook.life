import logging

import requests
from flask import request, session
from flask_api import FlaskAPI
from flask_api.status import HTTP_403_FORBIDDEN
from google.auth.transport import requests as gr
from google.oauth2 import id_token

from src.verification.session import Session
from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

client_auth = FlaskAPI("client_auth")
client_auth.session_interface = Session()

CLIENT_ID = "457036339842-blejc39bdlrkfv9gftth6arssmjbnsqq.apps.googleusercontent.com"


@client_auth.route("/gen", methods=["POST"])
def generate():
    token = request.data.get("token", None)
    if token is None:
        session.delete = True
        return "Missing token", HTTP_403_FORBIDDEN

    try:
        info = id_token.verify_oauth2_token(token, gr.Request(), CLIENT_ID)
        session.email = info["email"]
    except ValueError as e:
        session.delete = True
        return "Failed", HTTP_403_FORBIDDEN

    client = AuthClient("http://localhost:5000")
    try:
        res = client.login(LoginRequest(email=info["email"]))
    except Exception as e:
        log.critical(e)
        session.delete = True
        return {}, HTTP_403_FORBIDDEN

    session.token = res.token

    return {"status": "ok", "token": res.token}


@client_auth.route("/logout", methods=["POST"])
def logout():
    session.delete = True
    return {"status": "ok"}
