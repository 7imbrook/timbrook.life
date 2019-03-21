from flask import request
from flask_api import FlaskAPI
from flask_api.status import HTTP_403_FORBIDDEN


client_auth = FlaskAPI("client_auth")


@client_auth.route("/")
def test():
    return "Hello World"


@client_auth.route("/gen", methods=["POST"])
def generate():
    token = request.data.get("token", None)
    if token is None:
        return 'Missing token', HTTP_403_FORBIDDEN

    if not False:
        return 'Invalid Token', HTTP_403_FORBIDDEN
        
    return "Hello World"