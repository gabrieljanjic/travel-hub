const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Country || mongoose.model("Country", countrySchema);
