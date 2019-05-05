from mutagen.mp3 import MP3

import io
import requests
from datetime import timedelta
from botocore.exceptions import ClientError

from util import s3
from processors.base import QueueProccessorBase
from twirp.Account_pb2_twirp import AuthClient
from twirp.Account_pb2 import LoginRequest
from twirp.AsyncTypes_pb2 import DurationPayload


class DurationCalcProccessor(QueueProccessorBase):
    queue_name = "duration_calc_processor"
    routing_key = "async.calulate_duration"

    async def async_process(self, message: DurationPayload) -> bool:
        pod_file = io.BytesIO()

        try:
            self.log.info("Downloading file to memory...")
            obj = s3.Object("timbrook-podcast", message.handle)
            obj.download_fileobj(pod_file)
            audio = MP3(pod_file)
        except ClientError as e:
            # dequeue the message, drop it on the floor
            self.log.warning(e)
            return True
        except Exception as e:
            self.log.critical(f"{e.__class__.__name__}: {e}")
            # DROP
            return True

        self.log.info(audio.info.pprint())
        duration = timedelta(seconds=audio.info.length)

        # close enough for podcast work
        timestring = str(duration).split(".")[0]

        self.log.info(f"{message.handle}: {timestring}")
        # TODO! Get auth from rabbit headers :)
        ac = AuthClient("http://auth-server-appshell.production.svc.cluster.local")
        res = ac.login(LoginRequest(service_name="postprocessor"))

        requests.patch(
            f"http://postgrest-api.production.svc.cluster.local/episodes?id=eq.{message.episode}",
            headers={"Authorization": f"Bearer {res.token}"},
            data={"duration": timestring},
        ).raise_for_status()

        return True
