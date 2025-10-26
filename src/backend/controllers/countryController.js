const Airport = require("../models/airportModel");
const Country = require("../models/countryModel");

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.status(200).json({
      status: "success",
      data: countries,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.getAllCountriesAirports = async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });

    const airports = await Airport.find();
    res.status(200).json({
      status: "success",
      data: { countries, airports },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
