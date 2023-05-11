import { Response } from "express";
import {
  badRequest,
  callSoap,
  RequestWithQuery,
  serverError,
  success,
} from "../../utils";
import { mapStops } from "../getAllStops/mapStops";
import { soapXML } from "../getAllStops/soapXML";
import { mapNearby } from "./mapNearby";

export const getNearbyStops = async (
  req: RequestWithQuery<{ mc: string }>,
  res: Response
) => {
  try {
    const coords = req.query.mc.split(":");

    if (coords.length == 0) {
      return badRequest(res, "You must specify stopId");
    }

    const soap = await callSoap(soapXML);
    const stops = await mapStops(soap.data);
    const nearby = mapNearby(Number(coords[0]), Number(coords[1]), stops ?? []);

    return success(res, nearby);
  } catch (error) {
    return serverError(res, error);
  }
};
