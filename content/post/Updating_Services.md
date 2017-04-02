+++
showpagemeta = true
draft = false
date = "2017-03-15T20:20:55-04:00"
title = "Updating Services"
showcomments = true
categories = ["docker"]
tags = []
slug = ""
comments = false

+++

Here's how I currently update service configurations. I'm gonna add a "cleaner" way into the tool I'm writing [Name TDB](https://github.com/7imbrook/auto-service-updater). Basically this tool is going to be the cli/daemon I use for managing my clusters/data-centers.

```
$ docker service update \
    --secret-add update_config_v5 \
    --secret-rm update_config_v4 \
    --env-add CONFIG_PATH=/run/secrets/update_config_v5 \
    updater
```

It involves creating and version secrets then updating the services to look at the new secret. Kinda annoying but with better tooling, updating configs/secrets could be nicer.
