import express from "express";
import {
  createBeautician,
  createEntertainer,
  createEventStylist,
  createPhotographer,
  createTransport,
  deleteEvent,
  eventCreate,
  fetchEvent,
  fetchId,
  getAllBeautician,
  getAllEntertainer,
  getAllPhotographers,
  getAllStylist,
  getAllTransports,
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

// entertainer

router.post("/createentertain", createEntertainer);
router.get("/getenter", getAllEntertainer);

// beautician

router.post("/createbeauty", createBeautician);
router.get("/getbeauty", getAllBeautician);

// eventStylist

router.post("/createstyle", createEventStylist);
router.get("/getstyle", getAllStylist);

// transport

router.post("/createtransport", createTransport);
router.get("/gettransport", getAllTransports);

export default router;
