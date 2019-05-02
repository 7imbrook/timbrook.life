#!/usr/bin/env python

import click
import os
import asyncio
import aio_pika
import logging
from processors import QueueProccessorBase

logging.basicConfig(
    format="[%(levelname)-8s][%(asctime)s] %(name)s:  %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("consumer")

# Util function
async def dict_gather(dict_await):
    keys = dict_await.keys()
    awaitable = dict_await.values()
    res = await asyncio.gather(*awaitable)
    return dict(zip(keys, res))


async def main(loop, production):
    log.info("Starting in %s", "prod" if production else "dev")
    password = os.environ.get("AMQT_PASSWORD")
    connection = await aio_pika.connect_robust(
        host="rabbitmq.production.svc.cluster.local",
        login="user",
        password=password,
        loop=loop,
    )

    async with connection:
        log.info("Connected to exchange")
        channel = await connection.channel()

        create_map = {
            proc(): channel.declare_queue(
                f"{proc.queue_name}{'' if production else '_development'}",
                auto_delete=False,
            )
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

        await asyncio.gather(
            *[proc.async_consume(queue) for proc, queue in queue_map.items()]
        )


@click.command()
@click.option("--prod", is_flag=True)
def post_processor(prod):
    loop = asyncio.get_event_loop()
    asyncio.ensure_future(main(loop, prod))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        log.info("Shutting down...")
        # TODO: trigger clean shutdown
        log.info("Done")


if __name__ == "__main__":
    post_processor()

