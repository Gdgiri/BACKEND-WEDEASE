import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      required: true,
      default: "user",
    },
    imgUrl: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regex for validating phone number formats
          return /^\+?(\d[\d-]{7,15})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
