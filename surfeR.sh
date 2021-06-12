#!/bin/bash

# Run with:
# /surfeR/surfeR.sh > /dev/null 2>/dev/null &

chmod u+x /surfeR/config.sh
. /surfeR/config.sh

docker stop php
docker run --rm -d -p 80:80 --name php \
  -v /surfeR/www:/var/www/html \
  -v /surfeR/www-run/1:/1 \
  -v /surfeR/www-run/2:/2 \
  -v /surfeR/www-run/3:/3 \
  php:apache

shopt -s nullglob
chmod u+x /surfeR/R/*.sh
while true
do
  pending=(/surfeR/www-run/1/persistent/* /surfeR/www-run/1/ephemeral/*)
  while [ ${#pending[@]} -eq 0 ]
  do
    #inotifywait -m /surfeR/www-run/1 -e create -e moved_to | echo "found"
    cat /surfeR/www-run/1/pause > /dev/null
    pending=(/surfeR/www-run/1/persistent/* /surfeR/www-run/1/ephemeral/*)
  done

  # Check how many containers are running
  # Keep looping until we have capacity
  procs=(/surfeR/Rrunning/*)
  while [ ${#procs[@]} -gt $((MAXSIMUL-1)) ]
  do
    cat /surfeR/www-run/1/pause > /dev/null
    procs=(/surfeR/Rrunning/*)
  done

  /surfeR/R/run.sh &
  /surfeR/R/tidy.sh &
  sleep 1
done
