#!make
MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

import-db:
		node ./importDB.js
