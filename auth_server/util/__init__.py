import logging
import time

from functools import wraps


logging.basicConfig(level=logging.INFO, format='%(asctime)-15s: %(message)s')

def log_request(func):

    @wraps(func)
    def _wrap(*args, **kwargs):
        start = time.time_ns()
        response = func(*args, **kwargs)
        end = time.time_ns()
        ms_time = (end - start) / 1000
        try:
            url = kwargs.get("ctx").get('url')
            logging.info(f"{ms_time} µs - {url}")
        finally:
            return response

    return _wrap
