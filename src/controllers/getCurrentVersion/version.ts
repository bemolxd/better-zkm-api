import { Request, Response } from "express";

export const getCurrentVersion = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "success",
    result: {
      version: process.env.npm_package_version,
      request: req.headers,
    },
  });
};
