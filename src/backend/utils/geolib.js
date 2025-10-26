const geolib = require("geolib");

const geolibFunction = (originAirportA, destinationAirportA) => {
  const distanceInM = geolib.getDistance(
    {
      latitude: originAirportA.location.lat,
      longitude: originAirportA.location.lng,
    },
    {
      latitude: destinationAirportA.location.lat,
      longitude: destinationAirportA.location.lng,
    }
  );
  return geolib.convertDistance(distanceInM, "km");
};

module.exports = geolibFunction;
