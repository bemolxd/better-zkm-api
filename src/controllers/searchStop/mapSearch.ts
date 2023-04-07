import { parseStringPromise } from "xml2js";
import { AvailableStop, ParsedSearchSoap } from "./types";

export const mapSearch = async (soapData: string) => {
  try {
    const parsedSoapRes: ParsedSearchSoap = await parseStringPromise(soapData);

    const stops: AvailableStop[] | undefined = parsedSoapRes["soap:Envelope"]?.[
      "soap:Body"
    ][0].GetStopsByNameResponse[0].GetStopsByNameResult[0].Stops[0].S.map(
      (s) => {
        const stop = s.$;

        return {
          id: Number(stop.id),
          name: stop.name,
          comments: stop.uwg.trim(),
          posX: Number(stop.x),
          posY: Number(stop.y),
          lines: stop.l.split(";").map((l) => {
            const line = l.split(",");

            return {
              number: Number(line[0]),
              vehicleType: line[1].includes("A") ? "A" : "T",
            };
          }),
        };
      }
    );

    return stops;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};
