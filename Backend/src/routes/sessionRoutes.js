import express from "express";
import { protectRoute } from "../middlewares/protectRoute";
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../controllers/sessionController";
const router = express.Router();
router.post("/", protectRoute,createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, getSessionById);
router.get("/:id/join", protectRoute, joinSession);
router.get("/:id/end", protectRoute, endSession);
export default router;