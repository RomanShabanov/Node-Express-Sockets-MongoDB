import express from "express";

import userRotes from "./users/users.routes";
import petsRotes from "./pets/pets.routes";

const Router = express.Router();

Router.use("/users", userRotes);
Router.use("/pets", petsRotes);

export default Router;
