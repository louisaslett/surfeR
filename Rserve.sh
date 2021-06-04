#!/bin/bash

# Run with:
# /rserve/Rserve.sh > /dev/null 2>/dev/null &

chmod u+x /rserve/config.sh
. /rserve/config.sh

docker stop php
docker run --rm -d -p 80:80 --name php \
  -v /rserve/www:/var/www/html \
  -v /rserve/www-run/1:/1 \
  -v /rserve/www-run/2:/2 \
  -v /rserve/www-run/3:/3 \
  php:apache

shopt -s nullglob
chmod u+x /rserve/R/*.sh
while true
do
  pending=(/rserve/www-run/1/*)
  while [ ${#pending[@]} -eq 0 ]
  do
    #inotifywait -m /rserve/www-run/1 -e create -e moved_to | echo "found"
    sleep 1
    pending=(/rserve/www-run/1/*)
  done

  # Check how many containers are running
  # Keep looping until we have capacity
  procs=(/rserve/Rrunning/*)
  while [ ${#procs[@]} -gt $((MAXSIMUL-1)) ]
  do
    echo "full"
    sleep 1
    procs=(/rserve/Rrunning/*)
  done

  /rserve/R/run.sh &
  /rserve/R/tidy.sh &
  sleep 1
done