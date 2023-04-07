import type { NextFunction, Request, Response } from "express";
import { callSoap } from "../../utils";
import { soapXML } from "./soapXML";
import { mapStreets } from "./mapStreets";

export const getAllStreets = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const soap = await callSoap(soapXML);

    const streets = await mapStreets(soap.data);

    return res.status(200).json({ message: "success", result: streets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
