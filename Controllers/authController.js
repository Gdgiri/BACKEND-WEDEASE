import Auth from "../Models/authSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/config.js";
import { sendEmail } from "../Utils/senMail.js";

// Register

export const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const userExist = await Auth.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "username or email already exist" });
    }

    const hashedPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new Auth({ username, email, password: hashedPassword });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "user registered successfully", result: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register failed due to internal server error",
      error: error.message,
    });
  }
};

// Login

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compareSync(password, user.password);
    console.log("password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isUser: user.isUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "login failed due to internal server error",
      error: error.message,
    });
  }
};

// Forgot Password

export const Forgot = async (req, res) => {
  const { email } = req.body;

  if (!email || email === "") {
    return res.status(400).json({ message: "email required" });
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    //Generate the token

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

    await user.save();

    const resetUrl = `http://localhost:3000/reset/${resetToken}`;
    const message = `You requested a password reset. Click the link below to reset your password. ${resetUrl}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ message: "email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res
        .status(500)
        .json({ message: "email sent failed due to internal server error" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "email sent failed due to internal server error" });
  }
};

// Reset Password

export const Reset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await Auth.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password

    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("New hashed password:", hashedPassword);

    user.password = hashedPassword;

    // Clear the reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// admin user data

export const Admin = async (req, res) => {
  try {
    const getData = await Auth.find({ isUser: true });
    res
      .status(200)
      .json({ message: "All Data Fetch Successfully", result: getData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Data Fetched Successfully" });
  }
};
