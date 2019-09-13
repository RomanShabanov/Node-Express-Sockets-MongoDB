import { Request, Response, NextFunction } from "express";

interface IData {
  code?: number;
  message?: string;
}

export default (
  { code = 400, message = "Data is missing." }: IData,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(code).json({
    payload: {
      error: true,
      message
    },
    status: {
      success: false,
      code
    }
  });

  next();
};
