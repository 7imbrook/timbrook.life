FROM centos:7

COPY ./kubernetes.repo /etc/yum.repos.d/kubernetes.repo

RUN yum update -y && yum install -y git kubectl openssl

WORKDIR /root
RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh
RUN chmod +x get_helm.sh
RUN ./get_helm.sh --version v2.12.3
RUN curl -sL https://github.com/digitalocean/doctl/releases/download/v1.13.0/doctl-1.13.0-linux-amd64.tar.gz | tar -xzv
RUN mv ./doctl /usr/local/bin

RUN mkdir .kube