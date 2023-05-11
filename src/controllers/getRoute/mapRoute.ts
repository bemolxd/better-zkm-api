import { parseStringPromise } from "xml2js";
import { MapLine, ParsedRoutesJSON, Route, RouteStop } from "./types";

export const mapRoutes = async (soap: string): Promise<Route[]> => {
  try {
    const parsedSoap = soap
      .match(/<json>(.*?)<\/json>/)
      ?.toString()
      .replace(/,+/g, ",");

    const { json } = await parseStringPromise(parsedSoap ?? "");

    const fixedJSON: ParsedRoutesJSON = JSON.parse(
      json
        .replace(/'/g, '"')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^\/])/g, '"$2":$4')
    );

    const routes: Route[] = fixedJSON.map((res) => {
      const routeStops: RouteStop[] = res.data.map((stop) => ({
        id: stop[0],
        name: stop[1].replace(
          /(&#(\d+);)/g,
          (_: any, __: any, charCode: number) => String.fromCharCode(charCode)
        ),
        lng: stop[2],
        lat: stop[3],
        line: Number(stop[6]),
        vehicleType: stop[7],
        departureDate: stop[14].trim(),
        departureTime: stop[13],
        lineIdx: stop[15],
      }));

      const mapPoints = res.data.reduce((result: any, stop) => {
        (result[stop[15]] = result[stop[15]] || []).push(...stop[8]);

        return result;
      }, {});

      const mapLines: MapLine[] = Array.from(Object.keys(mapPoints)).map(
        (key) => ({
          line: Number(key),
          coords: mapPoints[key],
          vehicleType: routeStops.filter((s) => s.lineIdx === Number(key))[0]
            .vehicleType,
        })
      );

      return {
        id: res.id + res.journey_start,
        startTime: res.journey_start,
        endTime: res.journey_end,
        mapLines,
        routeStops,
      };
    });

    return routes;
  } catch (error) {
    console.error(error);
    throw new Error("SOAP XML data mapping error");
  }
};
