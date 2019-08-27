import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

import bold from "chalk";
const { cyan: info, yellow: warning, red: error, magenta: fatal } = bold;

import { MONGODB_URI, isTest } from "./variables";

const mongooseOpts = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
};

if (isTest) {
  const mongoServer = new MongoMemoryServer();

  mongoServer.getConnectionString().then(mongoUri => {
    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on("connected", () => {
      console.log(info("Mongoose default connection is open to ", mongoUri));
    });
  });
} else {
  mongoose.connect(MONGODB_URI, mongooseOpts);

  mongoose.connection.on("connected", () => {
    console.log(info("Mongoose default connection is open to ", MONGODB_URI));
  });
}

mongoose.connection.on("error", (err: any) => {
  console.log(
    warning("Mongoose default connection has occured " + err + " error")
  );
});

mongoose.connection.on("disconnected", () => {
  console.log(error("Mongoose default connection is disconnected"));
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      fatal(
        "Mongoose default connection is disconnected due to application termination"
      )
    );
    process.exit(0);
  });
});

export default mongoose;
