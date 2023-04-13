import { Stop } from "../getAllStops/types";

export const mapNearby = (lat: number, lng: number, stops: Stop[]): Stop[] => {
  try {
    const distance = (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ) => {
      const radLat1 = Math.PI * (lat1 / 180);
      const radLat2 = Math.PI * (lat2 / 180);
      const theta = lng1 - lng2;
      const radTheta = Math.PI * (theta / 180);
      var dist =
        Math.sin(radLat1) * Math.sin(radLat2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

      if (dist > 1) {
        dist = 1;
      }

      dist = Math.acos(dist);
      dist = dist * (180 / Math.PI);
      dist = dist * 60 * 1.1515;
      return dist * 1.609344;
    };

    return stops
      .filter((stop) => distance(lat, lng, stop.lat, stop.lng) <= 0.5)
      .slice(0, 10);
  } catch (error) {
    console.error(error);
    throw new Error("Nearby stops data mapping error");
  }
};
