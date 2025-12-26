import express from "express";
import { generateDescription } from "../controllers/ai.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/generate-description", verifyToken, generateDescription);

export default router;
