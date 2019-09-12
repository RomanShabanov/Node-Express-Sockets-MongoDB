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