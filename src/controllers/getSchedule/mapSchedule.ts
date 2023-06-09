import { parseStringPromise } from "xml2js";
import { ParsedFullInfoSoap, StopFullInfo } from "./types";

export const mapSchedule = async (soap: string) => {
  // : Promise<StopFullInfo | undefined> => {
  try {
    const parsedSoapRes: ParsedFullInfoSoap = await parseStringPromise(soap);

    const parsedSchedules =
      parsedSoapRes["soap:Envelope"]?.["soap:Body"][0]
        .GetPlanedDeparutresFullInfoResponse[0]
        .GetPlanedDeparutresFullInfoResult[0].Schedules[0];

    if (!parsedSchedules) {
      return undefined;
    }

    const schedule = {
      time: parsedSchedules.$.time,
      name: parsedSchedules.Stop[0].$.name.trim(),
      stopNr: Number(parsedSchedules.Stop[0].$.num),
      id: Number(parsedSchedules.Stop[0].$.id),
      lines: parsedSchedules.Stop[0].Day.map((day) => ({})),
    };

    return schedule; // stopInfo;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};

// const stopInfo: StopFullInfo = {
//   time: parsedSchedules?.$.time!,
//   name: parsedSchedules?.Stop[0].$.name.trim()!,
//   number: Number(parsedSchedules?.Stop[0].$.num),
//   id: Number(parsedSchedules?.Stop[0].$.id),
//   schedule: {
//     sunday: getDaySchedule(0, parsedSchedules),
//     working: getDaySchedule(1, parsedSchedules),
//     saturday: getDaySchedule(2, parsedSchedules),
//   },
// };

// const getDaySchedule = (day: number, parsedSchedules: any): DaySchedule => ({
//   actual: parsedSchedules?.Stop[0].Day[day].$.actual.includes("F")
//     ? false
//     : true,
//   lines: parsedSchedules?.Stop[0].Day[day].R.map((line: any) => ({
//     number: Number(line.$.nr),
//     vehicleType: line.$.vehType.includes("A") ? "A" : "T",
//     direction: line.$.desc,
//     departures: line.S.map((dep: any) => ({
//       hour: Number(dep.$.th),
//       minute: Number(dep.$.tm),
//       courseId: Number(dep.$.id_kursu),
//       uid: Number(dep.$.uid),
//       additionalInfo: !dep.N
//         ? undefined
//         : {
//             sign: dep.N[0].$.ozn,
//             description: dep.N[0].$.oznDesc,
//           },
//     })),
//   })),
// });
