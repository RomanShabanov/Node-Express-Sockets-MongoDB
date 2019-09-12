import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import { expressLogger } from "./utils/logger";
import { PORT } from "./config/variables";

import MongoDB from "./config/database";
MongoDB();

const app: Application = express();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(expressLogger);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

import userRotes from "./api/users/users.routes";
import petsRotes from "./api/pets/pets.routes";
app.use("/v1/users", userRotes);
app.use("/v1/pets", petsRotes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
