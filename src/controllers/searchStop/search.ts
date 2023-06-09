import { Response } from "express";
import { callSoap, RequestWithQuery, serverError, success } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapSearch } from "./mapSearch";

export const searchStops = async (
  req: RequestWithQuery<{ q: string }>,
  res: Response
) => {
  try {
    const soap = await callSoap(getSoapXML(req.query.q));

    const search = await mapSearch(soap.data);

    return success(res, search);
  } catch (error) {
    return serverError(res, error);
  }
};
