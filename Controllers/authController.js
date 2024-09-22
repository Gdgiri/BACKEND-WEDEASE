import Auth from "../Models/authSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
      process.env.JWT_SECRET,
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
