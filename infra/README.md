Terraform and docker stack files for running in prod.

steps to deploy

```bash
terraform apply
# Connect to swarm with docker cloud swarm mode
docker stack deploy -c docker-compose.lb.yml traefik
docker stack deploy -c docker-compose.yml life
```

Needs digitalocean token and docker hub password for 7imbrook account. Or change it to your own.
