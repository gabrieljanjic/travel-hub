const axios = require("axios");
const mongoose = require("mongoose");
const Airport = require("../models/AirportModel");
require("dotenv").config();

exports.getAirports = async (req, res) => {
  try {
    const { countryId } = req.query;

    let query = {};
    if (countryId) {
      query.countryId = countryId;
    }

    const airports = await Airport.find(query).populate("countryId");

    res.status(200).json({
      status: "success",
      data: airports,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createAirport = async (req, res) => {
  const { name, iataCode, icaoCode, countryId } = req.body;

  try {
    const existingAirport = await Airport.findOne({
      iataCode: iataCode.toUpperCase(),
    });
    if (existingAirport) {
      return res.status(400).json({
        status: "error",
        message: "Airport with this IATA code already exists",
      });
    }

    let lat = 0;
    let lng = 0;

    const apiKey = process.env.GOOGLE_API_KEY;
    const searchQuery = `${name} Airport`;
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchQuery
    )}&key=${apiKey}`;

    const result = await axios.get(googleApi);

    if (result.data.status === "OK" && result.data.results?.length > 0) {
      const location = result.data.results[0].geometry.location;
      lat = location.lat;
      lng = location.lng;
    }

    const airport = await Airport.create({
      name,
      iataCode: iataCode.toUpperCase(),
      icaoCode: icaoCode.toUpperCase(),
      countryId,
      location: { lat, lng },
    });

    res.status(201).json({
      status: "success",
      data: airport,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, iataCode, icaoCode, countryId } = req.body;
    let lat = 0;
    let lng = 0;

    const apiKey = process.env.GOOGLE_API_KEY;
    const searchQuery = `${name} Airport`;
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchQuery
    )}&key=${apiKey}`;

    const result = await axios.get(googleApi);

    if (result.data.status === "OK" && result.data.results?.length > 0) {
      const location = result.data.results[0].geometry.location;
      lat = location.lat;
      lng = location.lng;
    }

    const airport = await Airport.findByIdAndUpdate(
      id,
      {
        name,
        iataCode: iataCode.toUpperCase(),
        icaoCode: icaoCode.toUpperCase(),
        countryId,
        location: { lat, lng },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Airport updated successfully",
      data: airport,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteAirport = async (req, res) => {
  try {
    const { id } = req.params;
    await Airport.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Airport deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
