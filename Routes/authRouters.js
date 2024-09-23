import express from "express";
import {
  Forgot,
  Login,
  Register,
  Reset,
} from "../Controllers/authController.js";

const router = express.Router();

// Routes

router.post("/register", Register);
router.post("/login", Login);
router.post("/forgot", Forgot);
router.post("/reset/:token", Reset);


export default router;
