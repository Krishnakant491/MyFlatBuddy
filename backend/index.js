import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken"
import userModel from "./models/user.model.js";
import userRouter from "./routes/user.route.js";
import connectDB from "./utils/db.js";
import { resetPassword } from "./controllers/user.controller.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import Postrouter from "./routes/post.route.js";
import { Application } from "./models/application.model.js";
import applicationRouter from "./routes/application.route.js";

const secretkey='qwerty123'
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(secretkey));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions)); // Apply CORS middleware

const router= express.Router()

app.use("/api/v1/user",userRouter)
app.use("/api/v1/user", Postrouter)
app.use("/api/v1/user",applicationRouter)
router.route('/reset-password').post(resetPassword);

const PORT= process.env.PORT || 3001
// Start the server
app.listen(PORT, () => {
  connectDB()
  console.log("Server is running on PORT", PORT);
});

