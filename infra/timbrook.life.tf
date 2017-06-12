# Access to digital ocean, docker cloud password can be
# your generated api token (and should be)
variable "do_token" {}
variable "docker_cloud_password" {}

# Set up the digital ocean provider
provider "digitalocean" {
  token = "${var.do_token}"
}

# This is the main web server, We init a swarm master and start the min required services
resource "digitalocean_droplet" "web" {
  image  = "docker-16-04"
  name   = "timbrook.life"
  region = "nyc1"
  size   = "512mb"
  ssh_keys = [
    "71:00:ac:ea:c9:12:e5:af:cf:a6:af:15:8e:72:72:9c"
  ]
  volume_ids = ["${digitalocean_volume.swarm-backup.id}"]

  # Rexray volume management, used for databases inside of docker
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

  # maybe make this chef, or copy in a script
  provisioner "remote-exec" {
    inline = [
      "apt-get update",
      "apt-get upgrade -y",
      "curl -sSL https://agent.digitalocean.com/install.sh | sh",
      "docker info",
      "mkdir -p /etc/rexray/",
      "cp /tmp/config.yml /etc/rexray/rexray.yml",
      "curl -sSL https://dl.bintray.com/emccode/rexray/install | sh -",
      "systemctl start rexray",
      "mount -o discard,defaults /dev/disk/by-id/scsi-0DO_Volume_swarmbackup /var/lib/docker/swarm;",
      " echo /dev/disk/by-id/scsi-0DO_Volume_swarmbackup /var/lib/docker/swarm ext4 defaults,nofail,discard 0 0 | sudo tee -a /etc/fstab",
      # Because we're mounting in the raft backup, that means that all the services *should* come back online
      "docker swarm init --force-new-cluster --advertise-addr ${digitalocean_droplet.web.ipv4_address}",
    ]
  }

}

# Attach the swarm manager raft log to backup recovery
resource "digitalocean_volume" "swarm-backup" {
  region      = "nyc1"
  name        = "swarmbackup"
  size        = 10
  description = "Swarm raft backup"
}

# External IP
resource "digitalocean_floating_ip" "external_ip" {
  droplet_id = "${digitalocean_droplet.web.id}"
  region     = "${digitalocean_droplet.web.region}"
}
