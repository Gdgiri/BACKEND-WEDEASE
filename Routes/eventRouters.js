import express from "express";
import {
  createPhotographer,
  deleteEvent,
  eventCreate,
  fetchEvent,
  fetchId,
  getAllPhotographers,
  updateEvent,
} from "../Controllers/eventController.js";
import { createFood, getFood } from "../Controllers/cateringController.js";

const router = express.Router();

router.post("/create", eventCreate);
router.get("/getevent", fetchEvent);
router.get("/getid/:id", fetchId);
router.put("/editevent/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

// catering

router.post("/createfood", createFood);
router.get("/getfood", getFood);

// photographer

router.post("/createphoto", createPhotographer);
router.get("/getphoto", getAllPhotographers);

export default router;
