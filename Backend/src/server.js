import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js";
import {inngest, functions} from "./lib/inngest.js";
const app = express();
const __dirname = path.resolve();
//Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use("/api/inngest", serve({client:inngest, functions}));
app.get("/health", (req,res)=>{
    res.status(200).json({message:"API is up and running"})
})
app.get("/books", (req,res)=>{
    res.status(200).json({message:"API is up and running"})
})
//Make our app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}", (req,res)=>{
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