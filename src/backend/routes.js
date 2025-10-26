const express = require("express");
const router = express.Router();
require("dotenv").config();

const airlineController = require("../backend/controllers/airlineController");
const airportController = require("../backend/controllers/airportController");
const countryController = require("../backend/controllers/countryController");
const routeController = require("../backend/controllers/routeController");
const dashboardController = require("../backend/controllers/dashboardController");

//AIRPORTS
router.get("/get-airports", airportController.getAirports);
router.post("/create-airport", airportController.createAirport);
router.put("/update-airport/:id", airportController.updateAirport);
router.put("/delete-airport/:id", airportController.deleteAirport);

//AIRLINES
router.get("/get-all-airlines", airlineController.getAllAirlines);
router.post("/create-airline", airlineController.createAirline);
router.put("/update-airline", airlineController.updateAirline);
router.put("/delete-airline/:id", airlineController.deleteAirline);

//ROUTES
router.get("/get-all-routes", routeController.getAllRoutes);
router.post("/create-route", routeController.createRoute);
router.put("/update-route/:id", routeController.updateRoute);
router.put("/delete-route/:id", routeController.deleteRoute);

//COUNTRIES
router.get("/get-all-countries", countryController.getAllCountries);
router.get(
  "/get-all-countries-airports",
  countryController.getAllCountriesAirports
);

//DASHBOARD
router.get("/get-all-lengths", dashboardController.getAllLengths);

//CONFIG
router.get("/get-maps-config", (req, res) => {
  res.json({
    status: "success",
    data: {
      mapsApiKey: process.env.GOOGLE_API_KEY,
    },
  });
});

module.exports = router;
