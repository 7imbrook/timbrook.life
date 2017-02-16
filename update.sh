#!/bin/bash
set -e

# Force update stack, requires secret reattachment
docker stack deploy -c docker-compose.yml life

# Needed secrets, waiting for compose to get secrets
for service in life_auth life_postgres life_api; do
    docker service update --secret-add postgres_password $service;
done

for service in life_auth life_api; do
    docker service update --secret-add jwtkey $service;
done
