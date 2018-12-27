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
  helm upgrade --install --namespace staging \
                          --set ingress.host=${HOST_PREFIX}timbrook.tech \
                          --set container.image=$NEW_IMAGE \
                          --set environment.namespace=$NAMESPACE \
                          --wait \
        $APP ./
}

###
# Setup environment, maybe move some of this into .circle.yaml
#
NEW_IMAGE=7imbrook/life@sha256:$(cat meta/BUILD_SHA)

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
  *)
    exit 1
esac
