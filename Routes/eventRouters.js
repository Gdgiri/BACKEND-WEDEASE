import express from "express";
import { eventCreate } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create", eventCreate);

export default router;
