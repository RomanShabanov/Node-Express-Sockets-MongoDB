const mongoose = require("mongoose");

const {
  cyan: connected,
  yellow: error,
  red: disconnected,
  magenta: termination
} = require("chalk").bold;

const mongoURI = require("./variables").DB;

module.exports = function() {
  mongoose.connect(mongoURI);

  mongoose.connection.on("connected", function() {
    console.log(connected("Mongoose default connection is open to ", mongoURI));
  });

  mongoose.connection.on("error", function(err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", function() {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
