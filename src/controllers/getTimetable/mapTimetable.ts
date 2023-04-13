import { parseStringPromise } from "xml2js";
import { ParsedTimetableSoap, StopTimetable } from "./types";

export const mapTimetable = async (
  soap: string
): Promise<StopTimetable | undefined> => {
  try {
    var parsedSoapRes: ParsedTimetableSoap = await parseStringPromise(soap);

    const parsedSchedule =
      parsedSoapRes["soap:Envelope"]?.["soap:Body"][0]
        ?.CNR_GetRealDeparturesResponse[0].CNR_GetRealDeparturesResult[0]
        .Schedules[0];

    if (!parsedSchedule) {
      return undefined;
    }

    const timetable: StopTimetable = {
      time: parsedSchedule?.$.time!,
      id: Number(parsedSchedule?.Stop[0]?.$.id)!,
      name: parsedSchedule?.Stop[0].$.name!,
      day: {
        type: parsedSchedule?.Stop[0].Day[0].$.type!,
        description: parsedSchedule?.Stop[0].Day[0].$.desc!,
      },
      departures: parsedSchedule?.Stop[0].Day[0].R.map((dep) => ({
        direction: dep.$.dir,
        id: Number(dep.S[0].$.id),
        number: Number(dep.$.nr),
        secondsLeft: Number(dep.S[0].$.s),
        time: dep.S[0].$.t,
        vehicleType: dep.$.vt.includes("A") ? "A" : "T",
      })),
    };

    return timetable;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};
