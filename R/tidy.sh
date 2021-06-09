#!/bin/bash

. /rserve/config.sh

cd /rserve/www-run
find . -maxdepth 3 -mmin +$GCTIMEOUT -type f -delete
