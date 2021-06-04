#!/bin/bash

# Assumes an Ubuntu 20.04 system

# Install Docker on Ubuntu 20.04
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
apt-cache policy docker-ce
### Check last line shows docker and not ubuntu repo
sudo apt install docker-ce
sudo systemctl status docker

# Pull images
docker pull rocker/ml-verse:4.0.5
docker pull php:apache

# Setup directories
mkdir -p /rserve /rserve/R /rserve/Rrunning /rserve/www /rserve/www-run /rserve/www-run/1 /rserve/www-run/2 /rserve/www-run/3
chown -R www-data:www-data /rserve
chmod -R 755 /rserve

# Now put all info in place
