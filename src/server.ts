import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import { expressLogger } from "./utils/logger";
import { PORT, isProd } from "./config/variables";

import errorsMiddleware from "./middlewares/errors";
import commonMiddleware from "./middlewares/common";

import MongoDB from "./config/database";
MongoDB();

const app: Application = express();
commonMiddleware.map(middleware => middleware(app));

if (isProd) {
  app.use(expressLogger);
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

import routesV1 from "./api/v1/routes";
app.use("/v1", routesV1);

app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
