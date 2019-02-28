#!/bin/bash

RELEASE_NAME=$1;
APP_SHA=$2;

if [[ -z "${APP_SHA}" ]]; then
    echo "No new sha skip deploy"
    exit 0;
fi

helm upgrade -i -f ./values.yaml --set image.sha=$APP_SHA $RELEASE_NAME personal/appshell;