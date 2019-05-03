import abc
import asyncio
import json
from box import Box
import logging


class QueueProccessorBase(metaclass=abc.ABCMeta):
    @property
    def log(self):
        return logging.getLogger(str(self.__class__.__name__))

    @property
    def disabled(self) -> bool:
        return False

    @abc.abstractproperty
    def queue_name(self) -> str:
        pass

    @abc.abstractproperty
    def routing_key(self) -> str:
        pass

    async def async_consume(self, queue):
        if self.disabled:
            self.log.warn("Not starting consumer, disabled")
            return
        self.log.info("Starting consumer")
        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                await self.on_message(message)

    async def on_message(self, message):
        should_requeue_if_failure = message.delivery_tag < 15 or True
        try:
            body = Box(json.loads(message.body))
        except Exception:
            message.reject()
        try:
            if await self.async_process(body):
                message.ack()
            else:
                message.reject(requeue=should_requeue_if_failure)
        except Exception as e:
            self.log.critical(f"{e.__class__.__name__}: {e}")
            # May want to kill switch this
            message.reject(requeue=should_requeue_if_failure)

    @abc.abstractclassmethod
    async def async_process(self, message) -> bool:
        pass
