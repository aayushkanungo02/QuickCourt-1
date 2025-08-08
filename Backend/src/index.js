import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();
const app = express();
const PORT  = process.env.PORT || 4001

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});



