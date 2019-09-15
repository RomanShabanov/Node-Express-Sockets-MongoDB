all: start-mongo-rs secure-connection

issue-certificate:
	@sudo openssl genrsa -out ./security/localhost.key 2048
	@sudo openssl req -new -x509 -key ./security/localhost.key -out ./security/localhost.crt -days 3650 -subj /CN=localhost
	@sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./security/localhost.crt

MONGO_SCRIPT := $(shell cat ./replica_set.config)

start-mongo-rs:
	@echo "Starting MongoDB Replica Set (localhost:27017)"
	@docker-compose -f ./docker-compose.yml up -d
	@echo Wait...
	@sleep 15
	@docker exec -it MongoDB-Primary mongo --eval "$(MONGO_SCRIPT)"
	@docker exec -it MongoDB-Primary mongo --eval "rs.status()"
	@sh hosts.sh
	@docker-compose ps
	@echo "\033[92mDone.\033[0m"
	@echo "\033[92mMongoDB connection string: mongodb://localhost:27017,localhost:27018,localhost:27019/database?replicaSet=rs0\033[0m"

secure-connection:
	@echo "Create certificates for secure connection"
	openssl req -nodes -new -x509 -keyout ./security/server.key -out ./security/server.cert