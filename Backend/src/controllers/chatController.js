import {chatClient} from "../lib/stream.js";
export async function getStreamToken(req,res){
    try {
        //use clerkId for Stream(not mongodb_id)=>it should match the id that is present in stream
        const token = chatClient.createToken(req.user.clerkId);
        return res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profilePicture,
        })
    } catch (error) {
        console.log("Error generating stream token:", error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
}