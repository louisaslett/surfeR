#!/bin/bash

# Assumes an Ubuntu 20.04 system

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
chmod u+x $SCRIPT_DIR/config.sh
. $SCRIPT_DIR/config.sh

# Install Docker on Ubuntu 20.04
if ! command -v docker &> /dev/null
then
  apt update
  apt install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  apt update
  apt-cache policy docker-ce
  ### Check last line shows docker and not ubuntu repo
  apt install -y docker-ce
  systemctl --no-pager status docker
fi

# Pull images
docker pull rocker/ml-verse:4.0.5
docker pull php:apache

# Setup directories
mkdir -p /rserve/Rrunning /rserve/www-run/0 /rserve/www-run/1/ephemeral /rserve/www-run/1/persistent /rserve/www-run/2 /rserve/www-run/3
cp $SCRIPT_DIR/Rserve.sh /rserve
cp $SCRIPT_DIR/config.sh /rserve
cp -r $SCRIPT_DIR/R /rserve
cp -r $SCRIPT_DIR/www /rserve
chown -R www-data:www-data /rserve
chmod -R 755 /rserve
echo -e "<?php\n\n\$DOMAIN='$DOMAIN';\n\$MAXRUNTIME='$MAXRUNTIME';\n\n?>" > /rserve/www/config.php

echo "Starting server ..."
/rserve/Rserve.sh > /dev/null 2>/dev/null &
