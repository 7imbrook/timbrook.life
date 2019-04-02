import logging
import os

import requests

logger = logging.getLogger(__name__)


class Client:
    def __init__(self):
        self.device = os.environ.get("PARTICLE_DEVICE")
        self.token = os.environ.get("PARTICLE_TOKEN")
        self.headers = headers = {
            "Authorization": f"Bearer {self.token}",
            "cache-control": "no-cache",
        }

    @property
    def connected(self) -> bool:
        """
        Check to see if the device is online and able to accept connections.
        Attempt to wake if possible (not currently possible w/out door buzz)
        """
        if ParticleAPI.ping(self):
            return True
        # Attempt to wake
        return False


class ParticleAPI:

    BASE_DEVICE_URL = "https://api.particle.io/v1/devices"

    @classmethod
    def triggerFunction(cls, client, function):
        url = f"{cls.BASE_DEVICE_URL}/{client.device}/{function}"
        logger.info("Triggering Door - Start")
        res = requests.request("POST", url, headers=client.headers)
        logger.info(f"Triggering Door - End [{res.status_code}]")

    @classmethod
    def ping(cls, client) -> bool:
        url = f"{cls.BASE_DEVICE_URL}/{client.device}/ping"
        status = requests.request("PUT", url, headers=client.headers).json()
        return status["online"]
