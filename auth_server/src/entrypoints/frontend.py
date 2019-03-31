from flask import request, make_response
from flask_api import FlaskAPI
from flask_api.status import HTTP_403_FORBIDDEN
from src.verification.constents import config
from src.verification.session import SessionGenerator
from jose import jwt
from jose.exceptions import JOSEError

client_auth = FlaskAPI("client_auth")


@client_auth.route("/gen", methods=["POST"])
def generate():
    token = request.data.get("token", None)
    if token is None:
        return "Missing token", HTTP_403_FORBIDDEN
    try:
        res = jwt.decode(token, config.jwk_pub)
    except JOSEError as e:
        return "Invalid Token", HTTP_403_FORBIDDEN

    resp = make_response({"status": "ok"})

    sg = SessionGenerator(res)
    sg.gen_session_cookie(resp)

    return resp
