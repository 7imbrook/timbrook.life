FROM centos:7

COPY ./kubernetes.repo /etc/yum.repos.d/kubernetes.repo

RUN yum update -y && yum install -y git kubectl openssl

RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
RUN curl -sL https://github.com/digitalocean/doctl/releases/download/v1.13.0/doctl-1.13.0-linux-amd64.tar.gz | tar -xzv
RUN mv ./doctl /usr/local/bin