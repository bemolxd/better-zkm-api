import express from "express";
import { getAllStops } from "../controllers/getAllStops/stops";
import { getAllStreets } from "../controllers/getAllStreets/streets";
import { searchStops } from "../controllers/searchStop/search";
import { getTimetable } from "../controllers/getTimetable/timetable";
import { getSchedule } from "../controllers/getSchedule/schedule";
import { getRoute } from "../controllers/getRoute/route";
import { getNearbyStops } from "../controllers/getNearbyStops/nearby";

const router = express.Router();

router.get("/stops", getAllStops);
router.get("/streets", getAllStreets);
router.get("/search", searchStops);
router.get("/timetable", getTimetable);
router.get("/schedule", getSchedule);
router.post("/route", getRoute);
router.get("/nearby", getNearbyStops);

export = router;
