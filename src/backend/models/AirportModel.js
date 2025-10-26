const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  iataCode: {
    type: String,
    required: true,
    uppercase: true,
    length: 3,
  },
  icaoCode: {
    type: String,
    required: true,
    uppercase: true,
    length: 4,
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

airportSchema.pre(/^find/, function (next) {
  if (this.getOptions().includeDeleted) {
    return next();
  }
  this.where({ isDeleted: false });
  next();
});

module.exports =
  mongoose.models.Airport || mongoose.model("Airport", airportSchema);
