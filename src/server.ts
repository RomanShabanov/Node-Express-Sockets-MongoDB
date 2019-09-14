import express, { Application } from "express";
import { expressLogger } from "./utils/logger";
import { PORT, isProd } from "./config/variables";

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

if (isProd) {
  app.use(expressLogger);
}

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}. Go to http://localhost:${PORT}/`
  );
});
