# Hotelscanner

## Development
- Make shure you have docker installed
- Make sure you have kubernetes-cli installed (https://labs.consol.de/development/java/kubernetes/2017/02/10/minikube.html)
- Make sure you have minikube installed (https://labs.consol.de/development/java/kubernetes/2017/02/10/minikube.html)
- Run `make generate-key-pair` to generate key pair for JWT
- Copy content of private and public keys to `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` env variables in `kube/*.yaml` files
- Set `IP` or `DBHOST` environment variable to IP or host that mongoDB is available on
- Change environment variables example values to real for all `kube/*.yaml` files. All variables are listed in `.env.example` files
- Create `data/db` folder in the project root for mongodb files
- Run `make run-db` to start mongodb server
- cd to `scripts`, set up env variables for db and run `make import-db` to import data into db
- Run `minikube start` to start minikube
- Run `make start` to build docker images for API services and deploy them
- Use url printed at the bottom of console to access API
- cd to `client`, set `API URL` using env vars, run `npm i` and `npm start`
- To run a specific service separately, define environment variables in `.env` file and run `make start`