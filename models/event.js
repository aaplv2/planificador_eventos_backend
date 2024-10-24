const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", eventSchema);
