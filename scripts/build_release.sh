#!/bin/sh

IMAGE=$1
CONTEXT=$2
LOG_KEY=$3

ACTIVE_SHA=$(git log --format=format:%H -n 1)
DIRLAST_SHA=$(git log --format=format:%H -n 1 .)

git show -q --pretty="%s" | grep "\[\(deployall\)\]" >> /dev/null
DEPLOY_ALL=$?

# Make in root
mkdir -p ~/logs
touch ~/logs/${LOG_KEY}_push.log 

build() {
    docker login -u $DOCKER_USER -p $DOCKER_PASS
    docker build -t $IMAGE $CONTEXT
    docker push $IMAGE | tee ~/logs/${LOG_KEY}_push.log
}

if [ "$ACTIVE_SHA" = "$DIRLAST_SHA" ]
then
    echo "dir changed, building"
    build;
    exit 0;
fi;

if [ $DEPLOY_ALL -eq 0 ]
then
    echo "deploy all flag found"
    build;
    exit 0;
fi;

