#!make
MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

start:
		npm link @hotelscanner/lib
		npm start
build:
		docker build ./ -t hotels:v1
