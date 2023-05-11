import type { Request, Response, NextFunction } from "express";
import { callSoap, serverError, success } from "../../utils";
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

    return success(res, stops);
  } catch (error) {
    return serverError(res, error);
  }
};
