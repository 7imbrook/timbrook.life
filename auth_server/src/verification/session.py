from flask_session.sessions import SessionInterface
from dataclasses import dataclass
import redis
from uuid import uuid4
import json
from box import Box
from itsdangerous import Signer, BadSignature, want_bytes
import logging
from redis.sentinel import Sentinel

log = logging.getLogger(__name__)


class Session(SessionInterface):

    session_class = Box

    def __init__(self):
        self.sentinel = Sentinel(
            [("redis-prod-redis-ha.production.svc.cluster.local", 26379)],
            socket_timeout=1.0,
        )
        self.key_prefix = "sk:"

    @property
    def write_master(self):
        return self.sentinel.master_for("mymaster", socket_timeout=1.0)

    @property
    def read_slave(self):
        return self.sentinel.slave_for("mymaster", socket_timeout=1.0)

    def _generate_sid(self):
        return str(uuid4())

    def _get_signer(self, app):
        return Signer("shhh", salt="flask-session", key_derivation="hmac")

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

        val = self.read_slave.get(self.key_prefix + sid)
        if val is not None:
            try:
                data = json.loads(val)
                return self.session_class(**data)
            except:
                return self.session_class(sid=sid, permanent=False)
        return self.session_class(sid=sid, permanent=False)

    def save_session(self, app, session, response):
        domain = self.get_cookie_domain(app)
        path = self.get_cookie_path(app)
        if not session:
            self.write_master.delete(self.key_prefix + session.sid)
            response.delete_cookie(app.session_cookie_name, domain=domain, path=path)

        httponly = self.get_cookie_httponly(app)
        secure = self.get_cookie_secure(app)
        expires = self.get_expiration_time(app, session)
        val = json.dumps(dict(session))
        self.write_master.setex(name=self.key_prefix + session.sid, value=val, time=300)
        session_id = self._get_signer(app).sign(want_bytes(session.sid))
        response.set_cookie(
            app.session_cookie_name,
            session_id,
            expires=expires,
            httponly=httponly,
            domain=domain,
            path=path,
            secure=secure,
        )

