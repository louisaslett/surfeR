#!/bin/bash

. /rserve/config.sh

cd /rserve/www-run
find . -maxdepth 2 -mmin +$GCTIMEOUT -type f -delete
