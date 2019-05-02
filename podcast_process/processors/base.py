import abc
import json
from box import Box


class QueueProccessorBase(metaclass=abc.ABCMeta):
    @abc.abstractproperty
    def queue_name(self) -> str:
        pass

    @abc.abstractproperty
    def routing_key(self) -> str:
        pass

    async def on_message(self, message):
        try:
            body = Box(json.loads(message.body))
        except Exception:
            message.reject()
        try:
            if await self.async_process(body):
                message.ack()
            else:
                message.reject(requeue=True)
        except Exception:
            # May want to kill switch this
            message.reject(requeue=True)

    @abc.abstractclassmethod
    async def async_process(self, message) -> bool:
        pass
