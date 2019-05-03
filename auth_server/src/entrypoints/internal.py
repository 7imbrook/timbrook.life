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
    def gen_account(self, access: str, via: str) -> Account:
        exp = datetime.now() + timedelta(minutes=SESSION_TIMEOUT)
        payload = {
            # TODO: lookup real db role mapping or none
            "role": "doadmin",
            # This is really a vc
            "access": access,
            # How was this token made
            "via": via,
            "exp": exp.timestamp(),
        }
        try:
            token = jwt.encode(payload, config.jwk, algorithm="RS512")
        except Exception as e:
            log.critical(e)
            raise

        return Account(token=token)

    @log_request
    def Login(self, login_request, ctx={}) -> Account:
        """
        Internal service but should still have some kinda verification
        """
        log.info("Token request")
        if login_request.email is None or login_request.service_name is None:
            # null account
            log.info("Blank login request")
            return Account()

        if login_request.email == "timbrook480@gmail.com":
            return self.gen_account(access="timbrook", via="email")

        if login_request.service_name == "postprocessor":
            return self.gen_account(access="postprocessor", via="service")

        # Blank account can't do anything
        return Account()
