import json


class Config:
    @property
    def jwk(self):
        with open("/var/run/secrets/rsa.jwk") as key:
            return json.loads(key.read())

    @property
    def jwk_pub(self):
        with open("/var/run/secrets/rsa.jwk.pub") as key:
            return json.loads(key.read())


config = Config()

