import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

import validator from "validator";

export const checkLoginParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    throw new HTTP400Error("Missing email.");
  }

  if (!validator.isEmail(req.body.email)) {
    throw new HTTP400Error("Email is incorrect.");
  }

  if (!req.body.password) {
    throw new HTTP400Error("Missing password.");
  }

  next();
};

export const checkPasswordStrength = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password: string = req.body.password.toString();

  if (!validator.isAlphanumeric(password)) {
    throw new HTTP400Error("Password should contain letters and numbers.");
  }

  if (password.length < 8) {
    throw new HTTP400Error("Password should be at least 8 characters long.");
  }
};

export const checkMongoId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validator.isMongoId(req.params.id)) {
    throw new HTTP400Error("Invalid MongoDB ObjectId.");
  }

  next();
};
