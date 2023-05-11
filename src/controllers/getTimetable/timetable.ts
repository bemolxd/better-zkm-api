import { Response } from "express";
import {
  badRequest,
  callSoap,
  RequestWithQuery,
  serverError,
  success,
} from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapTimetable } from "./mapTimetable";

export const getTimetable = async (
  req: RequestWithQuery<{ stopId: string }>,
  res: Response
) => {
  try {
    if (!req.query.stopId) {
      return badRequest(res, "You must specify stopId");
    }

    const soap = await callSoap(getSoapXML(req.query.stopId));

    const timetable = await mapTimetable(soap.data);

    return success(res, timetable);
  } catch (error) {
    return serverError(res, error);
  }
};
