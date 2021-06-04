#!/bin/bash

# Setup configuration options here ...

# Set the following to the domain you want to restrict access from.
# Note this is only a minor hurdle to other sites submitting code to run and
# not absolute protection.
# eg, I use:
# DOMAIN=".louisaslett.com"
# but you can leave empty to eliminiate this behaviour
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
