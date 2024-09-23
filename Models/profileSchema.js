import mongoose, { mongo } from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["male", "Female", "Others"],
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
