import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, // Required field
  },
  price: {
    type: Number,
    required: true, // Required field
  },
});

const beauticianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  services: [serviceSchema], // Embedding services schema
});

// Optional: Add indexes if needed for better performance
beauticianSchema.index({ name: 1 }); // Index on name for faster queries

const Beautician = mongoose.model("Beautician", beauticianSchema);
export default Beautician;
