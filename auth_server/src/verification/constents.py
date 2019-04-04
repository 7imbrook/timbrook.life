import json


class Config:
    def __init__(self, root="/var/run/secrets/"):
        self.root = root

    @property
    def jwk(self):
        with open(self.root + "rsa.jwk") as key:
            return json.loads(key.read())

    @property
    def jwk_pub(self):
        with open(self.root + "rsa.jwk.pub") as key:
            return json.loads(key.read())

    @property
    def session_key(self):
        return self.jwk["n"]


config = Config()
