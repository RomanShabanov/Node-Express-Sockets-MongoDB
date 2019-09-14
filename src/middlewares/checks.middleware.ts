import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkLoginParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    throw new HTTP400Error("Missing email.");
  } else if (!req.body.password) {
    throw new HTTP400Error("Missing password.");
  } else {
    next();
  }
};
