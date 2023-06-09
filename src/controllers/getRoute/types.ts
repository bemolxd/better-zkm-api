export type ParsedRoutesJSON = {
  id: string;
  start_time: number;
  end_time: number;
  total_duration: number;
  transit_time: number;
  walk_time: number;
  journey_start: number;
  journey_end: number;
  journey_duration: number;
  data: any[][];
}[];

export type Route = {
  id: string;
  startTime: number;
  endTime: number;
  mapLines: MapLine[];
  routeStops: RouteStop[];
};

export type MapLine = {
  line: number;
  coords: Coordinate[];
  vehicleType?: "A" | "T";
};

export type Coordinate = {
  lat: number;
  lng: number;
};

export type RouteStop = {
  id: number;
  name: string;
  lng: number;
  lat: number;
  line: number;
  lineIdx: number;
  vehicleType: "A" | "T";
  departureDate: string;
  departureTime: number;
};

export type RouteReqBody = {
  fc: string;
  tc: string;
  time: string;
  date: string;
};
