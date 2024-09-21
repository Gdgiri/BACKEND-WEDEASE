import Auth from "../Models/authSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//import crypto from "crypto";
import { validationResult } from "express-validator";

//Register a new user

export const register = async (req, res) => {
  const {
    isAdmin,
    role,
    imgUrl,
    username,
    email,
    password,
    phone,
    age,
    gender,
    city,
  } = req.body;

  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await Auth.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new Auth({
      isAdmin: false,
      role: role || "user",
      imgUrl,
      username,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      city,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", result: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Register Failed Interna; Server Error" });
  }
};

// login user

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Changed to 401
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      // Added status code
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed Internal Server Error" });
  }
};
