import { parseStringPromise } from "xml2js";
import { ParsedStopSoap, Stop } from "./types";

export const mapStops = async (soap: string) => {
  try {
    const parsedSoap: ParsedStopSoap = await parseStringPromise(soap);

    const stops: Stop[] | undefined = parsedSoap["soap:Envelope"]?.[
      "soap:Body"
    ][0]?.GetGoogleStopsResponse[0]?.GetGoogleStopsResult[0]?.Stops[0]?.S.map(
      (s) => {
        const stop = s.$!;

        return {
          id: Number(stop.id),
          number: Number(stop.nr),
          name: stop.n,
          vehicleType: stop.t.includes("T") ? "T" : "A",
          comments: stop.uwag.trim(),
          posX: Number(stop.x),
          posY: Number(stop.y),
        };
      }
    );

    return stops;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};
