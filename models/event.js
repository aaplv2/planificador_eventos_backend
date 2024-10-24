const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

module.exports = mongoose.model("event", eventSchema);
