import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  options: [
    {
      label: {
        type: String,
        required: true, // Required field for the type of transport
      },
      price: {
        type: Number,
        required: true, // Required field for the price of transport
      },
    },
  ],
});

// Optional: Add indexes if needed for better performance
transportSchema.index({ name: 1 }); // Index on name for faster queries

const Transport = mongoose.model("Transport", transportSchema);
export default Transport;
