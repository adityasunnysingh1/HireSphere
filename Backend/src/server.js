import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());

console.log("Allowed Client URL:", ENV.CLIENT_URL);

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.use(clerkMiddleware());

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "API is up and running" });
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Vynterview API is running successfully",
        endpoints: {
            health: "/api/health",
            chat: "/api/chat",
            sessions: "/api/sessions"
        }
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`✅ CORS allowing: ${ENV.CLIENT_URL}`);
        });
    } catch (error) {
        console.error("💥 Error starting the server:", error);
    }
};

startServer();