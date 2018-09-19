const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  Text: {
    type: String,
    required: true
    //   },
    //   fileUrl: {
    //     type: String
    //   },
    //   randomUrl: {
    //     type: String
    //   },
    //   _owner: {
    //     type: String
  }
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
