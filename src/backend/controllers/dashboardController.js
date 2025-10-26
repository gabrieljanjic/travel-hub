const mongoose = require("mongoose");
const Airport = require("../models/AirportModel");
const Airline = require("../models/AirlineModel");
const Route = require("../models/RouteModel");
const Country = require("../models/CountryModel");

exports.getAllLengths = async (req, res) => {
  try {
    const airportCount = await Airport.countDocuments({ isDeleted: false });
    const airlineCount = await Airline.countDocuments({ isDeleted: false });
    const routeCount = await Route.countDocuments({ isDeleted: false });
    const countryCount = await Country.countDocuments();

    res.status(200).json({
      status: "success",
      data: { airportCount, airlineCount, routeCount, countryCount },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
