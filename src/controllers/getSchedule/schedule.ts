import { Response } from "express";
import { callSoap, RequestWithQuery } from "../../utils";
import { getSoapXML } from "./getSoapXML";
import { mapSchedule } from "./mapSchedule";

export const getSchedule = async (
  req: RequestWithQuery<{ stopId: string }>,
  res: Response
) => {
  try {
    const soap = await callSoap(getSoapXML(req.query.stopId));

    const timetable = await mapSchedule(soap.data);

    return res.status(200).json({ message: "success", result: timetable });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error", error });
  }
};
