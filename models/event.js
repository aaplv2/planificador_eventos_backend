const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String },
    location: { type: String },
    date: { type: String },
    time: { type: String },
    price: { type: String },
    slots: { type: String },
    description: { type: String },
    attendees: {
      type: Array,
    },
    tasks: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", eventSchema);
