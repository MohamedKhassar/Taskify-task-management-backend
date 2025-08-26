import { connect } from "mongoose";
import { config } from "dotenv";
config();

const MONGO_URI=process.env.MONGO_URI
export const connectDB=async()=>{
    try {
        await connect(MONGO_URI,);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};
