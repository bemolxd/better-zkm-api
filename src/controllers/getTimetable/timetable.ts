import { Response } from "express";
import { callSoap, RequestWithQuery } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapTimetable } from "./mapTimetable";

export const getTimetable = async (
  req: RequestWithQuery<{ stopId: string }>,
  res: Response
) => {
  try {
    if (!req.query.stopId) {
      return res
        .status(400)
        .json({ message: "failure", error: "You must specify stopId" });
    }

    const soap = await callSoap(getSoapXML(req.query.stopId));

    const timetable = await mapTimetable(soap.data);

    return res.status(200).json({ message: "success", result: timetable });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
