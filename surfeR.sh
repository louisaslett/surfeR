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

# Ensure no dangling workers
killall runWorker.sh

# Pre-warm the workers
for i in $(seq -f "%03g" 1 $MAXSIMUL)
do
  . /surfeR/R/runWorker.sh $i &
done

while true
do
  pending=(/surfeR/www-run/1/persistent/* /surfeR/www-run/1/ephemeral/*)
  while [ ${#pending[@]} -eq 0 ]
  do
    #inotifywait -m /surfeR/www-run/1 -e create -e moved_to | echo "found"
    cat /surfeR/www-run/1/pause > /dev/null
    pending=(/surfeR/www-run/1/persistent/* /surfeR/www-run/1/ephemeral/*)
  done

  # Check for available workers
  workers=(/surfeR/Rrunning/*/ready)
  while [ ${#workers[@]} -eq 0 ]
  do
    cat /surfeR/www-run/1/pause > /dev/null
    workers=(/surfeR/Rrunning/*/ready)
  done
  nw=${workers[0]##*ing/}

  /surfeR/R/run.sh ${nw%/ready} &
  /surfeR/R/tidy.sh &
  sleep 0.25
done
