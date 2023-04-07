import { Response } from "express";
import { callSoap, RequestWithQuery } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapSearch } from "./mapSearch";

export const searchStops = async (
  req: RequestWithQuery<{ q: string }>,
  res: Response
) => {
  try {
    const soap = await callSoap(getSoapXML(req.query.q));

    const search = await mapSearch(soap.data);

    return res.status(200).json({ message: "success", result: search });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
