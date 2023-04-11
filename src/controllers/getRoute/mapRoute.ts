import { parseStringPromise } from "xml2js";
import { MapLine, ParsedRoutesJSON, Route, RouteStop } from "./types";

export const mapRoutes = async (soap: string) => {
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
        name: stop[1],
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
        })
      );

      return {
        id: res.id + res.start_time,
        startTime: res.start_time,
        endTime: res.end_time,
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
