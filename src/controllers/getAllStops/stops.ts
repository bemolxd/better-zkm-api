import type { Request, Response, NextFunction } from "express";
import { callSoap } from "../../utils";
import { soapXML } from "./soapXML";
import { mapStops } from "./mapStops";

export const getAllStops = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const soap = await callSoap(soapXML);

    const stops = await mapStops(soap.data);

    return res.status(200).json({ message: "success", result: stops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
