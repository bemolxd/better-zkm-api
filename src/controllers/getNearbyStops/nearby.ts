import { Response } from "express";
import { callSoap, RequestWithQuery } from "../../utils";
import { mapStops } from "../getAllStops/mapStops";
import { soapXML } from "../getAllStops/soapXML";
import { mapNearby } from "./mapNearby";

export const getNearbyStops = async (
  req: RequestWithQuery<{ lat: string; lng: string }>,
  res: Response
) => {
  try {
    const soap = await callSoap(soapXML);
    const stops = await mapStops(soap.data);
    const nearby = mapNearby(
      Number(req.query.lat),
      Number(req.query.lng),
      stops ?? []
    );

    return res.status(200).json({ message: "success", result: nearby });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
