import mongoose from "mongoose";

const serviceOptionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, // Required field
  },
  price: {
    type: Number,
    required: true, // Required field
  },
});

const eventStylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  services: [serviceOptionSchema], // Embedding service options schema
});

// Optional: Add indexes if needed for better performance
eventStylistSchema.index({ name: 1 }); // Index on name for faster queries

const EventStylist = mongoose.model("EventStylist", eventStylistSchema);
export default EventStylist;
