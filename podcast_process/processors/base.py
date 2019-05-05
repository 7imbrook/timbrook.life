import abc
import asyncio
import json
from box import Box
import logging
from json.decoder import JSONDecodeError
from google.protobuf import symbol_database as _symbol_database

_sym_db = _symbol_database.Default()


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
        symbol_lookup = message.headers.get("X-Proto-Symbol")
        if symbol_lookup is not None:
            parser = _sym_db.GetSymbol(symbol_lookup).FromString
        else:
            parser = lambda b: Box(json.loads(b))

        try:
            body = parser(message.body)
            print(body)
        except JSONDecodeError as e:
            message.reject()
        except Exception:
            message.reject()
        try:
            if await self.async_process(body, message.headers):
                message.ack()
            else:
                message.reject(requeue=should_requeue_if_failure)
        except Exception as e:
            self.log.critical(f"{e.__class__.__name__}: {e}")
            # May want to kill switch this
            message.reject(requeue=should_requeue_if_failure)

    @abc.abstractclassmethod
    async def async_process(self, message, headers) -> bool:
        pass
