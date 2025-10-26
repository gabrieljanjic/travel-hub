const Airline = require("../models/AirlineModel");
const geolib = require("geolib");

exports.getAllAirlines = async (req, res) => {
  try {
    const { airlineId } = req.query;

    let query = { isDeleted: false };
    if (airlineId) {
      query._id = airlineId;
    }

    const airlines = await Airline.find(query)
      .populate("homeCountryId")
      .populate("airportsIds");

    res.status(200).json({
      status: "success",
      data: airlines,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createAirline = async (req, res) => {
  try {
    const { name, homeCountryId, airportsIds } = req.body;

    if (!name || !homeCountryId) {
      return res.status(400).json({
        status: "error",
        message: "Name and home country are required",
      });
    }

    const existingAirline = await Airline.findOne({ name: name });
    if (existingAirline) {
      return res.status(400).json({
        status: "error",
        message: "Airline with this name already exists",
      });
    }

    const newAirline = await Airline.create({
      name,
      homeCountryId,
      airportsIds,
    });

    res.status(201).json({
      status: "success",
      message: "Airline created successfully",
      data: newAirline,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateAirline = async (req, res) => {
  try {
    const { _id, name, homeCountryId, airportsIds } = req.body;

    const existingAirline = await Airline.findOne({
      name: name,
      _id: { $ne: _id },
    });
    if (existingAirline) {
      return res.status(400).json({
        status: "error",
        message: "Another airline with this name already exists",
      });
    }

    const airline = await Airline.findByIdAndUpdate(
      { _id: _id },
      {
        name,
        homeCountryId,
        airportsIds,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Airline updated successfully",
      data: airline,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteAirline = async (req, res) => {
  try {
    const { id } = req.params;

    const airline = await Airline.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Airline deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
