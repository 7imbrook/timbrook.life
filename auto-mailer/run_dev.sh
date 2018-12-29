#!/usr/bin/env bash

docker build -t 7imbrook/mailer .
docker run -it -v $(pwd):/root/src -p 5000:5000 \
  -e FLASK_ENV=development \
  -e REDIS_HOST=localhost \
  -e REDIS_PASS=alpine3 \
  -e MAILGUN_KEY=$MAILGUN_KEY \
  7imbrook/mailer
