import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(mongoUrl, {
      dbName: "movie",
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
    } else {
      console.error("MongoDB connection error:", error);
    }
    process.exit(1); 
  }
};

export default connectToDB;
