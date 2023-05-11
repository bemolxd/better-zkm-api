import { Response } from "express";

export const badRequest = (res: Response, error?: any) =>
  res.status(400).json({ message: "failure", error });

export const success = (res: Response, result: any) =>
  res.status(200).json({ message: "success", result });

export const serverError = (res: Response, error?: any) =>
  res.status(500).json({ message: "server error", error });
