import express from "express";
import { chatWithAI, streamChat, getHistory } from "../controllers/aiController.js";

const router = express.Router();

// AI routes are now public (no authentication required)
router.post("/chat", chatWithAI);
router.post("/stream", streamChat);
router.get("/history", getHistory);

export default router;
