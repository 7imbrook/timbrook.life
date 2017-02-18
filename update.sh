#!/bin/bash
set -e

# Makes it only a little easier
docker stack deploy -c docker-compose.yml life
