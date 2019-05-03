from mutagen.mp3 import MP3

import io
from datetime import timedelta
from botocore.exceptions import ClientError

from util import s3
from processors.base import QueueProccessorBase


class DurationCalcProccessor(QueueProccessorBase):
    queue_name = "duration_calc_processor"
    routing_key = "asset.update"
    disabled = True

    async def async_process(self, message) -> bool:
        if message.storage_key is None:
            return True
        pod_file = io.BytesIO()

        try:
            self.log.info("Downloading file to memory...")
            obj = s3.Object("timbrook-podcast", message.storage_key)
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

        # Persist to store............
        self.log.info(f"{message.storage_key}: {timestring}")

        return True

