import { Response } from "express";
import { RequestWithBody, callSoap } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapRoutes } from "./mapRoute";
import { RouteReqBody } from "./types";

export const getRoute = async (
  req: RequestWithBody<RouteReqBody>,
  res: Response
) => {
  try {
    const soap = await callSoap(getSoapXML(req.body));

    const route = await mapRoutes(soap.data);

    res.status(200).json({
      message: "success",
      results: route,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failure", error });
  }
};
