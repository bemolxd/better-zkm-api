import { Response } from "express";
import {
  badRequest,
  callSoap,
  RequestWithQuery,
  serverError,
  success,
} from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapRoutes } from "./mapRoute";
import { RouteReqQuery } from "./types";
import { mapQuery } from "./mapQuery";

export const getRoute = async (
  req: RequestWithQuery<RouteReqQuery>,
  res: Response
) => {
  try {
    const fc = req.query.fc.split(":");
    const tc = req.query.tc.split(":");

    if (fc.length == 0 || tc.length == 0) {
      return badRequest(res, "Wrong coordinates specified");
    }

    const mappedQuery = mapQuery({
      fc,
      tc,
      time: req.query.time,
      date: req.query.date,
    });

    const soap = await callSoap(getSoapXML(mappedQuery));

    const routes = await mapRoutes(soap.data);

    return success(res, routes);
  } catch (error) {
    return serverError(res, error);
  }
};
