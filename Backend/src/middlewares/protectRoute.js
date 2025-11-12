import { requireAuth } from "@clerk/express";
import User from "../models/User";
export const protectRoute = [
    requireAuth(),
    async(req,res,next)=>{
        try {
            const clerkId = req.auth().userId;
            if(!clerkId){
                return res.status(401).json({message: "Unauthorized - invalid token"})
            }
            //find user in db by clerkId 
            const user = await User.findOne({clerkId})
            if(!user){
                return res.status(404).json({message: "User not found"})
            }
            req.user = user; //attach user to request object
            next();

        } catch (error) {
            console.log("Error in protectRoute middleware", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
]