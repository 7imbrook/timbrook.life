import json
import logging
import time
from datetime import datetime, timedelta

from jose import jwt

from src.verification.constents import config, SESSION_TIMEOUT
from twirp.Account_pb2 import Account
from twirp.Account_twirp_srv import AuthImpl
from util import log_request

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
        exp = datetime.now() + timedelta(minutes=SESSION_TIMEOUT)
        payload = {"role": "doadmin", "access": "timbrook", "exp": exp.timestamp()}
        try:
            token = jwt.encode(payload, config.jwk, algorithm="RS512")
        except Exception as e:
            log.critical(e)
            raise

        return Account(token=token)
