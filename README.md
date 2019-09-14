# Node.js Boilerplate: Express + MongoDB + Typescript + Socket.IO + pm2

## Development

Step 1: Start the MongoDB replica cluster (1 Primary + 2 Secondary)

`make`

Step 2: Once asked enter root password to insert host entries into /etc/hosts

Step 3: Confirm that localhost:27017 runs primary instance

```
docker exec -it MongoDB-Primary mongo
rs.isMaster().ismaster
```

Step 4: Enable certificates in Chrome

`chrome://flags/#allow-insecure-localhost`

### DAO

In the **Data Access Object** (DOA) layer, we can define the function which is directly connected to the database and fetch data and save data from and to the database.
