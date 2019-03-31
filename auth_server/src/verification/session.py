import uuid
from datetime import datetime


class SessionGenerator:
    def __init__(self, role):
        self.access = role.get("access", "anon")
        self.exp = role.get("exp")

    def gen_session_cookie(self, resp):
        sid = uuid.uuid4()

        # convert experation into cookie max age
        now = datetime.now()
        expdate = datetime.fromtimestamp(self.exp)
        duration = (expdate - now).seconds

        # TODO make secure
        resp.set_cookie("sessionid", sid.hex, max_age=duration)
