import os
import asyncio
import aio_pika
import logging
from processors import QueueProccessorBase

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("consumer")

# Util function
async def dict_gather(dict_await):
    keys = dict_await.keys()
    awaitable = dict_await.values()
    res = await asyncio.gather(*awaitable)
    return dict(zip(keys, res))


async def main(loop):
    log.info("Starting")
    password = os.environ.get("AMQT_PASSWORD")
    connection = await aio_pika.connect_robust(
        host="10.245.91.188", login="user", password=password, loop=loop
    )

    async with connection:
        log.info("Connected to exchange")
        channel = await connection.channel()

        create_map = {
            proc(): channel.declare_queue(proc.queue_name, auto_delete=False)
            for proc in QueueProccessorBase.__subclasses__()
        }

        queue_map = await dict_gather(create_map)
        log.info(f"Created {len(queue_map)} queues and processors")

        await dict_gather(
            {
                p: q.bind("amq.topic", routing_key=p.routing_key)
                for p, q in queue_map.items()
            }
        )

        log.info("Bound to topics")

        log.info("Started")
        while True:
            await asyncio.gather(
                *[queue.consume(proc.on_message) for proc, queue in queue_map.items()]
            )


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
    loop.close()
