#!/bin/bash

RELEASE_NAME=$1;
APP_SHA=$2;

helm diff upgrade -i -f ./values.yaml --set image.sha=$APP_SHA $RELEASE_NAME personal/appshell;

helm upgrade -i -f ./values.yaml --set image.sha=$APP_SHA $RELEASE_NAME personal/appshell;