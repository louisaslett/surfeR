#!/bin/bash

. /rserve/config.sh

# Get pending queue, sorted by filename, ignoring ephemeral or persistent status
pending=(`find /rserve/www-run/1 -type f -printf "%f %p\n" | sort | cut -f 2 -d " "`)
# Look for a UUID that does not have a running script
runwith=""
for check in "${pending[@]}"
do
  f=${check##*/}
  u=${f##*-}; u=${u%.R}
  d=/rserve/Rrunning/$u
  if [ ! -d $d ]; then
    runwith=$check
    break
  fi
done
# If there are none then exit
[ -z "$runwith" ] && exit 0

mkdir $d
mv $runwith /rserve/www-run/2/$f
touch /rserve/www-run/2/$f

if [[ $runwith == *"/persistent/"* ]]; then
  [ -f /rserve/www-run/0/$u.RData ] && cp /rserve/www-run/0/$u.RData $d
  sed "s/PERSISTENTFILE/$u.RData/g" /rserve/R/head-persistent.Rmd > $d/${f%.R}.Rmd
  cat /rserve/www-run/2/$f >> $d/${f%.R}.Rmd
  sed "s/PERSISTENTFILE/$u.RData/g" /rserve/R/tail-persistent.Rmd >> $d/${f%.R}.Rmd
else
  cat /rserve/R/head-ephemeral.Rmd > $d/${f%.R}.Rmd
  cat /rserve/www-run/2/$f >> $d/${f%.R}.Rmd
  cat /rserve/R/tail-ephemeral.Rmd >> $d/${f%.R}.Rmd
fi
cp /rserve/R/hidehead.css $d

timeout --kill-after=10s $MAXRUNTIME docker run --rm -v /rserve/Rrunning:/rserve/Rrunning rocker/ml-verse:4.0.5 timeout --kill-after=10s $MAXRUNTIME Rscript -e "rmarkdown::render('$d/${f%.R}.Rmd')"

retval=$?

if [ $retval -eq 124 ] || [ $retval -eq 137 ]
then
  echo "Sorry, your command timed out [status=$retval] (maximum runtime is $MAXRUNTIME)" > /rserve/www-run/3/${f%.R}.html
else
  if [ -f "$d/${f%.R}.html" ]
  then
    mv $d/${f%.R}.html /rserve/www-run/3
    if [[ $runwith == *"/persistent/"* ]]; then
      [ -f $d/$u.RData ] && cp $d/$u.RData /rserve/www-run/0/$u.RData
    fi
  else
    echo "Sorry, it looks like R might have crashed while running your code! [status=$retval]" > /rserve/www-run/3/${f%.R}.html
  fi
fi
touch /rserve/lastrun
rm /rserve/www-run/2/$f
rm -rf $d
