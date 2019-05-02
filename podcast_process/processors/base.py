import abc
import asyncio
import json
from box import Box
import logging


class QueueProccessorBase(metaclass=abc.ABCMeta):
    @property
    def log(self):
        return logging.getLogger(str(self.__class__.__name__))

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
                await asyncio.sleep(10)
                message.reject(requeue=True)
        except Exception as e:
            self.log.critical(e)
            # May want to kill switch this
            await asyncio.sleep(10)
            message.reject(requeue=True)

    @abc.abstractclassmethod
    async def async_process(self, message) -> bool:
        pass
