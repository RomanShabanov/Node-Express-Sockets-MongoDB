const mongoose = require("mongoose");

const {
  cyan: connected,
  yellow: error,
  red: disconnected,
  magenta: termination
} = require("chalk").bold;

const mongoURI = require("./variables").DB;

module.exports = () => {
  mongoose.connect(mongoURI);

  mongoose.connection.on("connected", () => {
    console.log(connected("Mongoose default connection is open to ", mongoURI));
  });

  mongoose.connection.on("error", (err: any) => {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
