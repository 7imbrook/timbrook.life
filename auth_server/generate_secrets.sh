#!/bin/bash

# TODO: generate from vault pki root key

# Generate key pair in jwk formate
jose jwk gen -i '{"alg": "RS512"}' -o rsa.jwk
jose jwk pub -i rsa.jwk -o rsa.jwk.pub

# Create/Update the production secrets
kubectl create secret generic jwt-keys \
    --from-file=./rsa.jwk \
    --from-file=./rsa.jwk.pub

