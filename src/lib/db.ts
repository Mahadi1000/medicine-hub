import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {});

    mongoose.set("bufferCommands", false);
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Handle connection error gracefully
    throw new Error("Failed to connect to the database");
  }
}

export default dbConnect;
