#!/bin/bash

IMAGE=$1
CONTEXT=$2
LOG_KEY=$3

# Make in root
mkdir -p ~/logs
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t $IMAGE $CONTEXT
docker push $IMAGE | tee ~/logs/${LOG_KEY}_push.log