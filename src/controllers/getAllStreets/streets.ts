import type { NextFunction, Request, Response } from "express";
import { callSoap, serverError, success } from "../../utils";
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

    return success(res, streets);
  } catch (error) {
    return serverError(res, error);
  }
};
