import express, { Request, Response, NextFunction } from "express";

import Pets from "./pets.model";

const Router = express.Router();

Router.route("/").get((req: Request, res: Response, next: NextFunction) => {
  Pets.find().then(pets => {
    res.status(200).json({
      payload: pets,
      status: {
        success: true,
        code: 200
      }
    });
  });
});

export default Router;
