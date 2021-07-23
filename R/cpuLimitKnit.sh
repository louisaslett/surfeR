#!/bin/bash

ulimit -t $1
Rscript -e "system('touch /surfeR/ready; cat /surfeR/hold > /dev/null'); rmarkdown::render('/surfeR/in.Rmd')"
