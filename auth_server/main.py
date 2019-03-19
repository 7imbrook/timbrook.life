import time
import json
from jose import jwt
from util import log_request
from werkzeug.wsgi import DispatcherMiddleware
from twirp.Account_pb2 import Account
from twirp.Account_twirp_srv import AuthImpl, AuthServer


class AuthServiceHandler(AuthImpl):
    @property
    def jwk(self):
        with open("./rsa.jwk") as key:
            return json.loads(key.read())
                

    @log_request
    def Login(self, login_request, ctx={}):
        """
        Internal service but should still have some kinda verification
        """
        payload = {
            "role": "notif_reader",
            "exp": time.time() + 300
        }
        try:
            token = jwt.encode(payload, self.jwk, algorithm='RS512')
        except Exception as e:
            print(e)
            raise

        return Account(
            token=token
        )


# define the health check uWSGI app
def health(environ, start_response):
    start_response("200 OK", [("Content-Type", "text/html")])
    return [b"ok"]


# Create uWSGI app
twirp = AuthServer(AuthServiceHandler())

server = DispatcherMiddleware(twirp, {"/health": health})
