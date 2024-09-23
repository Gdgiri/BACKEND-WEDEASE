import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    venueImg: {
      type: String,
      required: true,
    },
    venueName: {
      type: String,
      required: true,
      trim: true,
    },
    venuePlace: {
      type: String,
      required: true,
      trim: true,
    },
    venueAmount: {
      type: Number,
      required: true,
    },
    cateringName: {
      type: String,
      required: false,
      trim: true,
    },
    cateringAmount: {
      type: Number,
      required: false,
    },
    photographerName: {
      type: String,
      required: false,
      trim: true,
    },
    photographerAmount: {
      type: Number,
      required: false,
    },
    eventStylistName: {
      type: String,
      required: false,
      trim: true,
    },
    eventStylistAmount: {
      type: Number,
      required: false,
    },
    entertainerName: {
      type: String,
      required: false,
      trim: true,
    },
    entertainerAmount: {
      type: Number,
      required: false,
    },
    beauticianName: {
      type: String,
      required: false,
      trim: true,
    },
    beauticianAmount: {
      type: Number,
      required: false,
    },
    transportName: {
      type: String,
      required: false,
      trim: true,
    },
    transportAmount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
