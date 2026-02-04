import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

// 1. Add Svix Import (Required to verify Clerk's ID card)
import { Webhook } from "svix";

const PORT = process.env.PORT || 3000;

const app = express();

// 🛑 IMPORTANT: This Webhook Route MUST be defined BEFORE app.use(express.json())
// This route listens for Clerk messages, checks the signature, and forwards them to Inngest.
app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }), // Use raw body for signature verification
  async (req, res) => {
    try {
      const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;
      
      if (!SIGNING_SECRET) {
        throw new Error("Error: CLERK_WEBHOOK_SECRET is missing in Render/Env");
      }

      // Create a new Svix instance with your secret
      const wh = new Webhook(SIGNING_SECRET);
      const headers = req.headers;
      const payload = req.body;

      // Verify the payload (Safety Check)
      const evt = wh.verify(payload, {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"],
      });

      const { type, data } = evt;

      // ✅ Success! Send the event to Inngest
      if (type === "user.created") {
          await inngest.send({
            name: "clerk/user.created",
            data: { ...data, id: data.id },
            user: { id: data.id }
          });
          console.log("✅ Webhook: User Created event sent to Inngest!");
      }

      res.status(200).json({ success: true });

    } catch (err) {
      console.log("❌ Webhook failed:", err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

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