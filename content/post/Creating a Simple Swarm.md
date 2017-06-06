+++
draft = false
date = "2017-04-02T14:38:27-04:00"
showpagemeta = true
tags = []
slug = ""
comments = false
title = "Creating a Simple Swarm"
showcomments = true
categories = ["docker", "swarm", "aws", "lightsail"]

+++

Whenever I need to deploy a new project or fun hobby, I always set up a docker swarm cluster running somewhere. I’ve been doing this since it was a lot harder than it is today. The reason I don’t just ssh onto some server and clone my software, or allow any “jank” into even my personal deployments, is because it would kill me on the inside. I always try to implore best deployment and ci practices. Other than not physically being able to do anything else, deploying in a consistent reliable way always have some amount of challenge, and I take that as a learning experience.

```
sudo yum update -y

sudo yum install docker -y

sudo service docker start

sudo usermod -a -G docker ec2-user

sudo reboot

docker swarm init


```
