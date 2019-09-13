import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

import bold from "chalk";
const { cyan: info, yellow: warning, red: error, magenta: fatal } = bold;

import { MONGODB_URI, isTest } from "./variables";

export default async () => {
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: 3,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useCreateIndex: true, // Set to true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
    useFindAndModify: false // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify()
  };

  const connection_string = isTest
    ? await new MongoMemoryServer().getConnectionString()
    : MONGODB_URI;

  mongoose.connect(connection_string, mongooseOpts);

  mongoose.connection.on("connected", () => {
    console.log(
      info("Mongoose default connection is open to ", connection_string)
    );
  });

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
};
