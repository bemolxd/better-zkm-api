import { Response } from "express";
import { callSoap, RequestWithQuery } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapRoutes } from "./mapRoute";
import { RouteReqQuery } from "./types";

export const getRoute = async (
  req: RequestWithQuery<RouteReqQuery>,
  res: Response
) => {
  try {
    const soap = await callSoap(getSoapXML(req.query));

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
