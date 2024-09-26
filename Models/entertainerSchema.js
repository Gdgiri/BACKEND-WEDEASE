import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, // Required field
  },
  price: {
    type: Number,
    required: true, // Required field
  },
});

const entertainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  options: [optionSchema], // Embedding options schema
});

// Optional: Add indexes if needed for better performance
entertainerSchema.index({ name: 1 }); // Index on name for faster queries

const Entertainer = mongoose.model("Entertainer", entertainerSchema);
export default Entertainer;
