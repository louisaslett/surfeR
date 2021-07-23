#!/bin/bash

. /surfeR/config.sh

# Get pending queue, sorted by filename, ignoring ephemeral or persistent status
pending=(`find /surfeR/www-run/1 -type f -printf "%f %p\n" | sort | cut -f 2 -d " "`)
# Look for a UUID that does not have a running script
runwith=""
for check in "${pending[@]}"
do
  f=${check##*/}
  u=${f##*-}; u=${u%.R}
  d=/surfeR/Rrunning/$u
  if [ ! -d $d ]; then
    runwith=$check
    break
  fi
done
# If there are none then exit
[ -z "$runwith" ] && exit 0
# If there is one, then we reserve the worker to run it on
rm /surfeR/Rrunning/$1/ready

mkdir $d
mv $runwith /surfeR/www-run/2/$f
touch /surfeR/www-run/2/$f

if [[ $runwith == *"/persistent/"* ]]; then
  [ -f /surfeR/www-run/0/$u.RData ] && cp /surfeR/www-run/0/$u.RData /surfeR/Rrunning/$1/$u.RData
  sed "s/PERSISTENTFILE/$u.RData/g" /surfeR/R/head-persistent.Rmd > $d/${f%.R}.Rmd
  cat /surfeR/www-run/2/$f >> $d/${f%.R}.Rmd
  sed "s/PERSISTENTFILE/$u.RData/g" /surfeR/R/tail-persistent.Rmd >> $d/${f%.R}.Rmd
else
  cat /surfeR/R/head-ephemeral.Rmd > $d/${f%.R}.Rmd
  cat /surfeR/www-run/2/$f >> $d/${f%.R}.Rmd
  cat /surfeR/R/tail-ephemeral.Rmd >> $d/${f%.R}.Rmd
fi

cp $d/${f%.R}.Rmd /surfeR/Rrunning/$1/in.Rmd
echo "." > /surfeR/Rrunning/$1/hold

cat /surfeR/Rrunning/$1/hold > /dev/null
mv /surfeR/Rrunning/$1/in.html /surfeR/www-run/3/${f%.R}.html
[ -f /surfeR/Rrunning/$1/$u.RData ] && cp /surfeR/Rrunning/$1/$u.RData /surfeR/www-run/0/$u.RData

touch /surfeR/lastrun
rm /surfeR/www-run/2/$f
rm -rf $d
echo "." > /surfeR/Rrunning/$1/hold
echo "." > /surfeR/www-run/1/pause
