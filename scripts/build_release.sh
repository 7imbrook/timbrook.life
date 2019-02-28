#!/bin/sh

IMAGE=$1
CONTEXT=$2
LOG_KEY=$3

ACTIVE_SHA=$(git log --format=format:%H -n 1)
DIRLAST_SHA=$(git log --format=format:%H -n 1 .)

# Make in root
mkdir -p ~/logs

if [ "$ACTIVE_SHA" != "$DIRLAST_SHA" ]
then
    echo "No changes in directory, skipping build"
    touch ~/logs/${LOG_KEY}_push.log 
    exit 0
fi;

docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t $IMAGE $CONTEXT
docker push $IMAGE | tee ~/logs/${LOG_KEY}_push.log