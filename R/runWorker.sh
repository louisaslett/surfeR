#!/bin/bash

. /surfeR/config.sh

# Tidy up from any previous running worker
rm -rf /surfeR/Rrunning/$1*

while true
do
  mkdir -p /surfeR/Rrunning/$1
  mkfifo /surfeR/Rrunning/$1/hold
  cp /surfeR/R/hidehead.css /surfeR/Rrunning/$1
  cp /surfeR/R/cpuLimitKnit.sh /surfeR/Rrunning/$1

  docker run --rm -v /surfeR/Rrunning/$1:/surfeR rocker/ml-verse:4.0.5 /surfeR/cpuLimitKnit.sh $MAXRUNTIME

  retval=$?

  if [ $retval -eq 124 ] || [ $retval -eq 137 ]
  then
    echo "Sorry, your command timed out [status=$retval] (maximum runtime is $MAXRUNTIME)" > /surfeR/Rrunning/$1/in.html
  else
    if [ -f "/surfeR/Rrunning/$1/in.html" ]
    then
      echo "." > /dev/null
    else
      echo "Sorry, it looks like R might have crashed while running your code! [status=$retval]" > /surfeR/Rrunning/$1/in.html
    fi
  fi

  echo "." > /surfeR/Rrunning/$1/hold
  cat /surfeR/Rrunning/$1/hold > /dev/null
  rm -rf /surfeR/Rrunning/$1/*
done
