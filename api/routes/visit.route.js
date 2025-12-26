import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    createVisit,
    getVisits,
    getVisitRequests,
    updateVisit,
} from "../controllers/visit.controller.js";

const router = express.Router();

router.post("/", verifyToken, createVisit);
router.get("/", verifyToken, getVisits); // Outgoing
router.get("/requests", verifyToken, getVisitRequests); // Incoming
router.put("/:id", verifyToken, updateVisit); // Update status

export default router;
