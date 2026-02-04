import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../controllers/sessionController.js";

const router = express.Router();

// 🛑 DEBUG: Log when this file is loaded
console.log("✅ SESSION ROUTES FILE LOADED!");

// 🛑 DEBUG: Public Test Route (No Auth)
router.get("/test", (req, res) => {
    res.json({ message: "Session Routes are working!" });
});

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);
router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;