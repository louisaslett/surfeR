#!/bin/bash

# Setup configuration options here ...

# Set the following to the domain you want to restrict access from.
# Note this is *not* absolute protection and could be circumvented by a
# determined coder.
# Setting it will rely on browser's cross-site scripting rules to deny access
# by setting the domain of the cookie: therefore the page you embed the code
# editor on and the domain of the Rserve server must match (at the top level at
# least).
# Note that Chrome will require you to run entirely over SSL (main page and
# Rserve page) in order to use this feature.
# eg, I use:
# DOMAIN=".louisaslett.com"
# so that I can embed code editors on www.louisaslett.com and run R code on
# rserve.louisaslett.com
# You can leave empty to eliminiate this behaviour, though this would allow
# anyone to direct code to run from their webpage on your server.
DOMAIN=""

# What is the maximum runtime to allow?
# eg 30s => 30 seconds
#     1h => 1 hour
#  1h30m => 1 hour and 30 mins etc
MAXRUNTIME=30s

# How many queries to service in parallel.
# Be careful not to exhaust system memory or over-contend the CPU.  The value
# you can set here will depend on the usual resource consumption of the typical
# script run and how much memory/how many CPUs the server has
MAXSIMUL=2

# How long should incoming queries and completed script output be left before
# forced garbage collection (in minutes)?
GCTIMEOUT=30
