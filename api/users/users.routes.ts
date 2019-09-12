import express, { Request, Response, NextFunction } from "express";

import User from "./users.model";

const Router = express.Router();

Router.route("/").get((req: Request, res: Response, next: NextFunction) => {
  User.find().then(users => {
    res.status(200).json({
      payload: users,
      status: {
        success: true,
        code: 200
      }
    });
  });
});

Router.route("/:id").get(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id;

    console.log(user_id);

    const user = await User.findById(user_id);

    return res.status(200).json({
      payload: user,
      status: {
        success: true,
        code: 200
      }
    });
  }
);

export default Router;
