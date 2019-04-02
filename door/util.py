import os
from flask import request, abort
from functools import wraps
from twilio.request_validator import RequestValidator

auth_token = os.environ.get("TWILIO_AUTH")
validator = RequestValidator(auth_token)


def verify_twilio(url):
    def dectorator(func):
        @wraps(func)
        def inner(*args, **vargs):
            sig = request.headers.get("X-Twilio-Signature", None)
            if not validator.validate(url, request.form, sig):
                return abort(404)
            return func(*args, **vargs)

        return inner

    return dectorator

