import express from "express";
import { createProfile } from "../Controllers/profileController.js";

const router = express.Router();

// Routes

router.post("/create", createProfile);

export default router;
