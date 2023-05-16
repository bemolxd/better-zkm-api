import { Response } from "express";
import {
  badRequest,
  callSoap,
  RequestWithBody,
  serverError,
  success,
} from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapRoutes } from "./mapRoute";
import { RouteReqBody } from "./types";
import { mapBody } from "./mapBody";

export const getRoute = async (
  req: RequestWithBody<RouteReqBody>,
  res: Response
) => {
  try {
    const fc = req.body.fc.split(":");
    const tc = req.body.tc.split(":");

    if (fc.length == 0 || tc.length == 0) {
      return badRequest(res, "Wrong coordinates specified");
    }

    const mappedQuery = mapBody({
      fc,
      tc,
      time: req.body.time,
      date: req.body.date,
    });

    const soap = await callSoap(getSoapXML(mappedQuery));

    const routes = await mapRoutes(soap.data);

    return success(res, routes);
  } catch (error) {
    return serverError(res, error);
  }
};
