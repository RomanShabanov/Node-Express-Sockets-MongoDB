import express, { Request, Response, NextFunction } from "express";

import { getUsers, getUserById } from "./users.controller";

const Router = express.Router();

Router.route("/").get(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await getUsers();

    res.status(200).json({
      payload: users,
      status: {
        success: true,
        code: 200
      }
    });
  }
);

Router.route("/:id").get(
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
