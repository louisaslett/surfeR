#!/bin/bash

. /rserve/config.sh

pending=(/rserve/www-run/1/*)
f=${pending[0]##*/}
d=/rserve/Rrunning/${f%.R}

mkdir $d
mv /rserve/www-run/1/$f /rserve/www-run/2/$f
touch /rserve/www-run/2/$f

cat /rserve/R/head.Rmd > $d/${f%.R}.Rmd
cat /rserve/www-run/2/$f >> $d/${f%.R}.Rmd
cat /rserve/R/tail.Rmd >> $d/${f%.R}.Rmd
cp /rserve/R/hidehead.css $d

timeout --kill-after=10s $MAXRUNTIME docker run --rm -v /rserve/Rrunning:/rserve/Rrunning rocker/ml-verse:4.0.5 timeout --kill-after=10s $MAXRUNTIME Rscript -e "rmarkdown::render('$d/${f%.R}.Rmd')"

retval=$?

if [ $retval -eq 124 ] || [ $retval -eq 137 ]
then
  echo "Sorry, your command timed out [$retval] (maximum runtime is 10s)" > /rserve/www-run/3/${f%.R}.html
else
  if [ -f "$d/${f%.R}.html" ]
  then
    mv $d/${f%.R}.html /rserve/www-run/3
  else
    echo "Sorry, it looks like R might have crashed while running your code! [$retval]" > /rserve/www-run/3/${f%.R}.html
  fi
fi
touch /rserve/lastrun
rm /rserve/www-run/2/$f
rm -rf $d
