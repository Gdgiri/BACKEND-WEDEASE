import express from "express";
import {
  deleteEvent,
  eventCreate,
  fetchEvent,
  updateEvent,
} from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create", eventCreate);
router.get("/getevent", fetchEvent);
router.put("/editevent/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
