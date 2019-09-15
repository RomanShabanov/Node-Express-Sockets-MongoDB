import express, { Request, Response, NextFunction } from "express";

import { getUsers, getUserById, createUser } from "./users.controller";
import { checkMongoId } from "../../../middlewares/checks.middleware";

const Router = express.Router();

Router.route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const users = await getUsers();

    res.status(200).json({
      payload: users,
      status: {
        success: true,
        code: 200
      }
    });
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const user = await createUser(data);

    console.log(user);

    if (!user) {
      return next({
        code: 400,
        message: "Incorrect data."
      });
    }

    res.status(200).json({
      payload: user,
      status: {
        success: true,
        code: 200
      }
    });
  });

Router.route("/:id").get(
  checkMongoId,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      return next({
        code: 400,
        message: "User is missing"
      });
    }

    res.status(200).json({
      payload: user,
      status: {
        success: true,
        code: 200
      }
    });
  }
);

export default Router;
