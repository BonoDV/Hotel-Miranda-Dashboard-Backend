import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
require("dotenv").config();
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

export async function connectDB() {
  try {
    await mongoose.connect(uri!);
    console.log("Mongoose conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB con Mongoose:", error);
    process.exit(1);
  }
}
