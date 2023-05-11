import { Response } from "express";
import {
  badRequest,
  callSoap,
  RequestWithQuery,
  serverError,
  success,
} from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapSchedule } from "./mapSchedule";

export const getSchedule = async (
  req: RequestWithQuery<{ stopId: string }>,
  res: Response
) => {
  try {
    if (!req.query.stopId) {
      return badRequest(res, "You must specify stopId");
    }

    const soap = await callSoap(getSoapXML(req.query.stopId));

    const schedule = await mapSchedule(soap.data);

    return success(res, schedule);
  } catch (error) {
    return serverError(res, error);
  }
};
