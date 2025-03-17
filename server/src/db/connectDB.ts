import e from 'express';
import {connect} from 'mongoose';

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;