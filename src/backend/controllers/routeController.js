const mongoose = require("mongoose");
const geolibFunction = require("../utils/geolib");
const Route = require("../models/RouteModel");
const Airport = require("../models/AirportModel");
const Airline = require("../models/AirlineModel");

exports.getAllRoutes = async (req, res) => {
  try {
    const { airlineId } = req.query;

    let query = {};
    if (airlineId) {
      query.airlineId = airlineId;
    }

    const routes = await Route.find(query)
      .populate({
        path: "airlineId",
        populate: "homeCountryId",
      })
      .populate({
        path: "originAirportId",
        populate: "countryId",
      })
      .populate({
        path: "destinationAirportId",
        populate: "countryId",
      });

    res.status(200).json({
      status: "success",
      data: routes,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createRoute = async (req, res) => {
  const { airline, originAirport, destinationAirport } = req.body;
  try {
    const routeExists = await Route.findOne({
      airlineId: airline,
      originAirportId: originAirport,
      destinationAirportId: destinationAirport,
      isDeleted: false,
    });
    const routeExistsTwo = await Route.findOne({
      airlineId: airline,
      originAirportId: destinationAirport,
      destinationAirportId: originAirport,
      isDeleted: false,
    });

    if (routeExists || routeExistsTwo) {
      return res.status(400).json({
        status: "error",
        message: "Route already exists for this airline",
      });
    }

    const originAirportA = await Airport.findById(originAirport);
    const destinationAirportA = await Airport.findById(destinationAirport);

    const distanceInKm = geolibFunction(originAirportA, destinationAirportA);

    const route = await Route.create({
      airlineId: airline,
      originAirportId: originAirport,
      destinationAirportId: destinationAirport,
      distanceInKm: distanceInKm.toFixed(2),
    });
    res.status(201).json({
      status: "success",
      data: route,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    console.log("Req body:", req.body);
    const { id, airline, originAirport, destinationAirport } = req.body;
    console.log("Updating route with data:", req.body);
    const routeExists = await Route.findOne({
      airlineId: airline,
      originAirportId: originAirport,
      destinationAirportId: destinationAirport,
      isDeleted: false,
    });
    const routeExistsTwo = await Route.findOne({
      airlineId: airline,
      destinationAirportId: originAirport,
      originAirportId: destinationAirport,
      isDeleted: false,
    });
    if (routeExists || routeExistsTwo) {
      return res.status(400).json({
        status: "error",
        message: "Route already exists for this airline",
      });
    }
    const originAirportA = await Airport.findById(originAirport);
    const destinationAirportA = await Airport.findById(destinationAirport);

    const distanceInKm = geolibFunction(originAirportA, destinationAirportA);

    const route = await Route.findByIdAndUpdate(
      { _id: id },
      {
        airlineId: airline,
        originAirportId: originAirport,
        destinationAirportId: destinationAirport,
        distanceInKm: distanceInKm.toFixed(2),
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: route,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    await Route.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Route deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
