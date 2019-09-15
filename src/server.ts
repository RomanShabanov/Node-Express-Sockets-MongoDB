import express, { Application } from "express";
import http from "http";

import errorsMiddleware from "./middlewares/errors.middleware";
import commonMiddleware from "./middlewares/common.middleware";
import routesMiddleware from "./middlewares/routes.middleware";

import MongoDB from "./config/database";
MongoDB();

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const app: Application = express();

commonMiddleware.map(common => common(app));
routesMiddleware.map(routes => routes(app));
errorsMiddleware.map(errors => errors(app));

const { PORT = 3000 } = process.env;

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`)
);
