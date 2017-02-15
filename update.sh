#!/bin/bash

docker service update --secret-add rds_host life_api
docker service update --secret-add jwtkey life_api
docker service update --secret-add aws_rds_life_password life_api
