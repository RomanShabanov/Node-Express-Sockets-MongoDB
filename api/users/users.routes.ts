import express, { Request, Response, NextFunction } from "express";

export default express
  .Router()
  .get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      payload: [
        {
          id: 1,
          name: "Roman",
          pets: [
            {
              id: 1,
              nickname: "Milana"
            },
            {
              id: 2,
              nickname: "Kroha"
            }
          ]
        }
      ],
      status: {
        success: true,
        code: 200
      }
    });
  });
