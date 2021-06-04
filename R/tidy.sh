#!/bin/bash

cd /rserve/www-run
find . -maxdepth 2 -mmin +30 -type f -delete
