import json
import logging
import os
from dataclasses import dataclass
from datetime import datetime, timedelta
from uuid import uuid4

from box import Box
from flask_session.sessions import SessionInterface
from itsdangerous import BadSignature, Signer, want_bytes
from redis import Redis

from src.verification.constents import config

log = logging.getLogger(__name__)


class Session(SessionInterface):
    """
    This is a time.....
    """

    # TODO: strict type session
    session_class = Box

    def _generate_sid(self):
        return str(uuid4())

    def _get_signer(self, app):
        return Signer(config.session_key, salt="flask-session", key_derivation="hmac")

    def open_session(self, app, request):
        sid = request.cookies.get(app.session_cookie_name)
        if not sid:
            sid = self._generate_sid()
            return self.session_class(sid=sid, permanent=False)
        signer = self._get_signer(app)
        try:
            sid_as_bytes = signer.unsign(sid)
            sid = sid_as_bytes.decode()
        except BadSignature:
            sid = self._generate_sid()
            return self.session_class(sid=sid, permanent=False)

        return self.session_class(sid=sid, permanent=False)

    def save_session(self, app, session, response):
        domain = self.get_cookie_domain(app)
        path = self.get_cookie_path(app)
        if session.get("delete", False):
            response.delete_cookie(app.session_cookie_name, domain=domain, path=path)
            response.delete_cookie("logged_as", domain=domain, path=path)
            return

        httponly = self.get_cookie_httponly(app)
        secure = self.get_cookie_secure(app)
        duration = timedelta(minutes=5)
        expires = datetime.now() + duration

        session_id = self._get_signer(app).sign(want_bytes(session.sid))
        response.set_cookie(
            app.session_cookie_name,
            session_id,
            expires=expires.timestamp(),
            httponly=httponly,
            domain=domain,
            path=path,
            secure=secure,
        )
        response.set_cookie(
            "logged_as",
            session.email,
            expires=expires.timestamp(),
            httponly=False,
            path=path,
            secure=secure,
        )
