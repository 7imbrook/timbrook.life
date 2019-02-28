#!/bin/sh

ACTIVE_SHA=$(git log --format=format:%H -n 1)
DIRLAST_SHA=$(git log --format=format:%H -n 1 $1)

if [ "$ACTIVE_SHA" = "$DIRLAST_SHA" ]
then
    exit 0
else
    exit 1
fi;