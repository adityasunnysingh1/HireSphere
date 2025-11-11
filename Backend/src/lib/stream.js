import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
if(!apiKey){
    throw new Error("Missing Stream API Key");
}
const apiSecret = ENV.STREAM_API_SECRET;
if(!apiSecret){
    throw new Error("Missing Stream API Secret");
}
export const chatClient = StreamChat.getInstance(apiKey,apiSecret);
export const upsertStreamUser = async (userData) =>{
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData);
    } catch (error) {
        console.error("Error upserting stream user:", error);
    }
};
export const deleteStreamUser = async (userId) =>{
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting stream user:", error);
    }
};
//todo: add another method to generateToken


