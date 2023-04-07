import { parseStringPromise } from "xml2js";
import { ParsedStreetSoap, Street } from "./types";

export const mapStreets = async (soap: string) => {
  try {
    const parsedSoap: ParsedStreetSoap = await parseStringPromise(soap);

    const streets: Street[] | undefined = parsedSoap["soap:Envelope"]?.[
      "soap:Body"
    ][0].GetStreetsResponse[0]?.GetStreetsResult[0]?.Streets[0]?.Street.map(
      (s) => {
        return {
          id: Number(s.$.id),
          name: s._,
        };
      }
    );

    return streets;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};
