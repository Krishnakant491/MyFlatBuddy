import mongoose from "mongoose";
import "dotenv/config"
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB database successfully")
  } catch (error) {
    console.log("Error connecting MongoDB: ",error)
  }
};

export default connectDB
