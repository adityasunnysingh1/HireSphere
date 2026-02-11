import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middlewares/protectRoute.js";
const chatRouter = express.Router();
chatRouter.get("/token", protectRoute,getStreamToken);
export default chatRouter;