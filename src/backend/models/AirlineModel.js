const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  homeCountryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  airportsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports =
  mongoose.models.Airline || mongoose.model("Airline", airlineSchema);
