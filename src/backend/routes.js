const express = require("express");
const router = express.Router();
require("dotenv").config();

const airlineController = require("../backend/controllers/airlineController");
const airportController = require("../backend/controllers/airportController");
const countryController = require("../backend/controllers/countryController");
const routeController = require("../backend/controllers/routeController");
const dashboardController = require("../backend/controllers/dashboardController");
const authController = require("../backend/controllers/authController");

//AIRPORTS
router.get("/get-airports", airportController.getAirports);
router.post(
  "/create-airport",
  authController.requireAuth,
  airportController.createAirport
);
router.put(
  "/update-airport/:id",
  authController.requireAuth,
  airportController.updateAirport
);
router.put(
  "/delete-airport/:id",
  authController.requireAuth,
  airportController.deleteAirport
);

//AIRLINES
router.get("/get-all-airlines", airlineController.getAllAirlines);
router.post(
  "/create-airline",
  authController.requireAuth,
  airlineController.createAirline
);
router.put(
  "/update-airline",
  authController.requireAuth,
  airlineController.updateAirline
);
router.put(
  "/delete-airline/:id",
  authController.requireAuth,
  airlineController.deleteAirline
);

//ROUTES
router.get("/get-all-routes", routeController.getAllRoutes);
router.post(
  "/create-route",
  authController.requireAuth,
  routeController.createRoute
);
router.put(
  "/update-route",
  authController.requireAuth,
  routeController.updateRoute
);
router.put(
  "/delete-route/:id",
  authController.requireAuth,
  routeController.deleteRoute
);

//COUNTRIES
router.get("/get-all-countries", countryController.getAllCountries);
router.get(
  "/get-all-countries-airports",
  countryController.getAllCountriesAirports
);

//DASHBOARD
router.get("/get-all-lengths", dashboardController.getAllLengths);

//AUTH
router.get("/check-auth", authController.checkAuth);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

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
