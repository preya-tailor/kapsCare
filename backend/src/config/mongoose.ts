import mongoose from "mongoose";

export async function connectMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kapscareDb");
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.error("Mongoose connection failed:", error);
    process.exit(1);
  }
}