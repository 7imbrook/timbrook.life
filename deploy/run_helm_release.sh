#!/usr/bin/env bash


function authenticate_cluster () {
  doctl k c list -t $DO_TOKEN
  doctl k c kubeconfig show prod -t $DO_TOKEN > ~/.kube/config
  kubectl config set-context $(kubectl config current-context) --namespace=$NAMESPACE
  kubectl get all
  helm init --client-only
  helm list
}

function deploy_release () {
  set -e
  NEW_IMAGE=7imbrook/life@sha256:$(cat meta/BUILD_SHA)
  helm upgrade --install --namespace $NAMESPACE \
                          --set ingress.host=${HOST_PREFIX}timbrook.tech \
                          --set container.image=$NEW_IMAGE \
                          --set environment.namespace=$NAMESPACE \
                          --wait \
        $APP ./
}

function local_dev() {
  helm upgrade -i -f values.yaml -f local.yaml --set container.image=$NEW_IMAGE --set auth_service.image=$NEW_IMAGE_AUTH ad-hoc .
}

function build_push() {
  docker build -t 7imbrook/life $(git rev-parse --show-toplevel)
  docker push 7imbrook/life | tee /tmp/push.log
  NEW_IMAGE=7imbrook/life@sha256:$(tail -n 1 /tmp/push.log | cut -d':' -f 4 | cut -d' ' -f 1)

  docker build -t 7imbrook/auth $(git rev-parse --show-toplevel)/auth
  docker push 7imbrook/auth | tee /tmp/push.log
  NEW_IMAGE_AUTH=7imbrook/auth@sha256:$(tail -n 1 /tmp/push.log | cut -d':' -f 4 | cut -d' ' -f 1)
}

###
# Setup environment, maybe move some of this into .circle.yaml
#

if [ "$CIRCLE_BRANCH" = "master" ]; then
  APP="timbrook-tech"
  NAMESPACE="production"
  HOST_PREFIX=""
fi;

if [ "$CIRCLE_BRANCH" = "staging" ]; then
  APP="timbrook-tech-staging"
  NAMESPACE="staging"
  HOST_PREFIX="staging."
fi;

case "$1" in
  auth)
    authenticate_cluster
    ;;
  deploy)
    deploy_release
    ;;
  dev)
    build_push
    local_dev
    ;;
  *)
    exit 1
esac
