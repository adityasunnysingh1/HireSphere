import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";
import {clerkMiddleware} from "@clerk/express";
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js";
import {inngest, functions} from "./lib/inngest.js";
import { protectRoute } from "./middlewares/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
const app = express();
const __dirname = path.resolve();
//Middleware
app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
})); //Server allows a browser to include cookies on request
app.use(clerkMiddleware()); //This adds auth field to request object: req.auth()
app.use("/api/inngest", serve({client:inngest, functions}));
app.use("/api/chat", chatRoutes);
app.get("api/health", (req,res)=>{
    res.status(200).json({message:"API is up and running"})
})

//Make our app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

const startServer = async()=>{
    try {
        await connectDB();
        const port = ENV.PORT || 3000;
        app.listen(port, () => console.log(`✅ Server running on port ${port}`));


    } catch (error) {
        console.error("💥Error starting the server:", error)
    }
};
startServer();