import express from "express";
import {
  deleteEvent,
  eventCreate,
  fetchEvent,
  fetchId,
  updateEvent,
} from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create", eventCreate);
router.get("/getevent", fetchEvent);
router.get("/getid/:id", fetchId);
router.put("/editevent/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
