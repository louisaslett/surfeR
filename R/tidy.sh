#!/bin/bash

. /surfeR/config.sh

cd /surfeR/www-run
find . -maxdepth 3 -mmin +$GCTIMEOUT -type f -delete
