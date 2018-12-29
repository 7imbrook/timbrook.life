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
  helm dep build
  helm upgrade --install --namespace $NAMESPACE \
                          --set ingress.host=${HOST_PREFIX}timbrook.tech \
                          --set container.image=$NEW_IMAGE \
                          --set auth_service.image=$NEW_IMAGE_AUTH \
                          --set mailer_service.image=$NEW_IMAGE_MAILER \
                          --set environment.namespace=$NAMESPACE \
                          --description "Deployed by workflow https://circleci.com/workflow-run/${CIRCLE_WORKFLOW_ID}" \
                          --wait \
        $APP ./
}

function local_dev() {
  helm upgrade -i -f values.yaml -f local.yaml \
    --set container.image=$NEW_IMAGE \
    --set auth_service.image=$NEW_IMAGE_AUTH \
    --set mailer_service.image=$NEW_IMAGE_MAILER \
    ad-hoc .
}

function build_push() {
  docker build -t 7imbrook/life $(git rev-parse --show-toplevel)
  docker push 7imbrook/life | tee /tmp/push.log
  NEW_IMAGE=7imbrook/life@sha256:$(tail -n 1 /tmp/push.log | cut -d':' -f 4 | cut -d' ' -f 1)

  docker build -t 7imbrook/auth $(git rev-parse --show-toplevel)/auth
  docker push 7imbrook/auth | tee /tmp/push.log
  NEW_IMAGE_AUTH=7imbrook/auth@sha256:$(tail -n 1 /tmp/push.log | cut -d':' -f 4 | cut -d' ' -f 1)

  docker build -t 7imbrook/mailer $(git rev-parse --show-toplevel)/auto-mailer
  docker push 7imbrook/mailer | tee /tmp/push.log
  NEW_IMAGE_MAILER=7imbrook/mailer@sha256:$(tail -n 1 /tmp/push.log | cut -d':' -f 4 | cut -d' ' -f 1)
}

function set_image_refs() {
  NEW_IMAGE=7imbrook/life@sha256:$(cat meta/BUILD_SHA_MAIN)
  NEW_IMAGE_AUTH=7imbrook/auth@sha256:$(cat meta/BUILD_SHA_AUTH_APP)
  NEW_IMAGE_MAILER=7imbrook/mailer@sha256:$(cat meta/BUILD_SHA_MAILER_APP)
  echo $NEW_IMAGE;
  echo $NEW_IMAGE_AUTH;
  echo $NEW_IMAGE_MAILER;
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
    set_image_refs
    deploy_release
    ;;
  dev)
    build_push
    set_image_refs
    local_dev
    ;;
  *)
    exit 1
esac
