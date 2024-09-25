import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // Required field
  },
  options: [
    {
      label: {
        type: String,
        required: true, // Required field
      },
      price: {
        type: Number,
        required: true, // Required field
      },
    },
  ],
});

const photographerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  packages: [packageSchema], // Embedding package schema
});

// Optional: Add indexes if needed for better performance
photographerSchema.index({ name: 1 }); // Index on name for faster queries

const Photographer = mongoose.model("Photographer", photographerSchema);
export default Photographer;
