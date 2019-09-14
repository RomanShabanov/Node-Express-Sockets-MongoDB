import express, { Request, Response, NextFunction, Application } from "express";
import { expressLogger } from "./utils/logger";
import { PORT, isProd } from "./config/variables";

import errorsMiddleware from "./middlewares/errors";
import commonMiddleware from "./middlewares/common";

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

commonMiddleware.map(middleware => middleware(app));
import routesV1 from "./services/v1/routes";
app.use("/v1", routesV1);
errorsMiddleware.map(middleware => middleware(app));

if (isProd) {
  app.use(expressLogger);
}

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}. Go to http://localhost:${PORT}/`
  );
});
