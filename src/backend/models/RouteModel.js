const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  airlineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
    required: true,
  },
  originAirportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  destinationAirportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  distanceInKm: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

routeSchema.pre(/^find/, function (next) {
  if (this.getOptions().includeDeleted) {
    return next();
  }
  this.where({ isDeleted: false });
  next();
});

module.exports = mongoose.models.Route || mongoose.model("Route", routeSchema);
