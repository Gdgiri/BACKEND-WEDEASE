import express from "express";
import { eventCreate, fetchEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create", eventCreate);
router.get("/getevent", fetchEvent);

export default router;
