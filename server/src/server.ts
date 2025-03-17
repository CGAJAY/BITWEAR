import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB";
import { StatusCodes } from "http-status-codes";

configDotenv(); // Load .env file
const app = express(); // Create an Express app
const PORT = process.env.PORT; // Get the port from env

// middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
	res.status(StatusCodes.OK).json({ message: "Silence is golden" });
});

// Response message for undefined routes
app.use("*", (req, res) => {
	res.status(StatusCodes.NOT_FOUND).json({
		message: "Not found", 
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});