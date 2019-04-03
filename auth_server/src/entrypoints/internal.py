import time
import logging
from datetime import datetime, timedelta
import json
from jose import jwt
from util import log_request
from twirp.Account_pb2 import Account
from twirp.Account_twirp_srv import AuthImpl
from src.verification.constents import config

log = logging.getLogger(__name__)


class AuthServiceHandler(AuthImpl):
    @log_request
    def Login(self, login_request, ctx={}):
        """
        Internal service but should still have some kinda verification
        """
        log.info(f"Request from {login_request.email}")
        if login_request.email != "timbrook480@gmail.com":
            return Account()
        log.info(f"Granted token to {login_request.email}")
        exp = datetime.now() + timedelta(minutes=5)
        payload = {"role": "doadmin", "access": "timbrook", "exp": exp.timestamp()}
        try:
            token = jwt.encode(payload, config.jwk, algorithm="RS512")
        except Exception as e:
            print(e)
            raise

        return Account(token=token)
