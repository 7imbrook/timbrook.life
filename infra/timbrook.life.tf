variable "do_token" {}
variable "docker_cloud_password" {}

provider "digitalocean" {
  token = "${var.do_token}"
}

# NOTE: just add this out of ban, then add the private key to ssh-agent
# resource "digitalocean_ssh_key" "default" {
#   name       = "Discovered SSH key"
#   public_key = "${file("~/.ssh/id_rsa.pub")}"
# }

resource "digitalocean_droplet" "web" {
  image  = "docker-16-04"
  name   = "timbrook.life"
  region = "nyc1"
  size   = "512mb"
  ssh_keys = [
    "71:00:ac:ea:c9:12:e5:af:cf:a6:af:15:8e:72:72:9c"
  ]

  provisioner "file" {
    destination = "/tmp/config.yml"
    content = <<EOF
libstorage:
  service: dobs
  server:
    services:
      dobs:
        driver: dobs
        dobs:
          token: ${var.do_token}
          region: nyc1
EOF
  }

  provisioner "remote-exec" {
    inline = [
      "apt-get update",
      "apt-get upgrade -y",
      "docker info",
      "mkdir -p /etc/rexray/",
      "cp /tmp/config.yml /etc/rexray/rexray.yml",
      "curl -sSL https://dl.bintray.com/emccode/rexray/install | sh -",
      "systemctl start rexray",
      "echo public ipv4 ${digitalocean_droplet.web.ipv4_address}",
      "docker swarm init --advertise-addr ${digitalocean_droplet.web.ipv4_address}",
      # TODO: Remove old swarm from docker cloud
      "docker run -ti --rm -v /var/run/docker.sock:/var/run/docker.sock dockercloud/registration --user 7imbrook --swarmname 7imbrook/life --pass ${var.docker_cloud_password}"
    ]
  }

}

resource "digitalocean_floating_ip" "external_ip" {
  droplet_id = "${digitalocean_droplet.web.id}"
  region     = "${digitalocean_droplet.web.region}"
}
