import time
import json
from jose import jwt
from util import log_request
from twirp.Account_pb2 import Account
from twirp.Account_twirp_srv import AuthImpl


class AuthServiceHandler(AuthImpl):
    @property
    def jwk(self):
        with open("/var/run/secrets/rsa.jwk") as key:
            return json.loads(key.read())

    @log_request
    def Login(self, login_request, ctx={}):
        """
        Internal service but should still have some kinda verification
        """
        payload = {
            # Only release tokens that do nothing until this is a real service
            # "role": "notif_reader",
            "exp": time.time()
            + 300
        }
        try:
            token = jwt.encode(payload, self.jwk, algorithm="RS512")
        except Exception as e:
            print(e)
            raise

        return Account(token=token)
