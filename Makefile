#!make
MAKEFLAGS += --silent

generate-key-pair:
	ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
	openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
run-db:
		docker-compose -f ./db-compose.yml up
start:
		cd auth && make build
		cd bookings && make build
		cd hotels && make build
		kubectl apply -f kube/ambassador.yaml
		kubectl apply -f kube/auth.yaml
		kubectl apply -f kube/hotels.yaml
		kubectl apply -f kube/bookings.yaml
		echo ------------------------------
		minikube service ambassador --url