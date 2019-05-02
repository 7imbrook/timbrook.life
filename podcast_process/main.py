import os
import asyncio
import aio_pika
from processors import QueueProccessorBase


async def dict_gather(dict_await):
    keys = dict_await.keys()
    awaitable = dict_await.values()
    res = await asyncio.gather(*awaitable)
    return dict(zip(keys, res))


async def main(loop):
    connection = await aio_pika.connect_robust(
        os.environ.get("AMQT_CONNECTION"), loop=loop
    )

    async with connection:
        channel = await connection.channel()

        create_map = {
            proc(): channel.declare_queue(proc.queue_name, auto_delete=False)
            for proc in QueueProccessorBase.__subclasses__()
        }

        queue_map = await dict_gather(create_map)

        await dict_gather(
            {
                p: q.bind("amq.topic", routing_key=p.routing_key)
                for p, q in queue_map.items()
            }
        )

        while True:
            await asyncio.gather(
                *[queue.consume(proc.on_message) for proc, queue in queue_map.items()]
            )


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
    loop.close()
