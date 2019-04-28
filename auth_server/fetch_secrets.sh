#!/bin/bash

mkdir -p /var/run/secrets
chown timbrook /var/run/secrets/

kubectl get secrets -n production jwt-keys -o 'go-template={{index .data "rsa.jwk"}}' | base64 -D > /var/run/secrets/rsa.jwk
kubectl get secrets -n production jwt-keys -o 'go-template={{index .data "rsa.jwk.pub"}}' | base64 -D > /var/run/secrets/rsa.jwk.pub