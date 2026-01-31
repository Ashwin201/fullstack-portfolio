import mongoose from "mongoose";

export const connectToDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    
    if (!mongoUri) {
      throw new Error(
        "MONGODB_URL environment variable is not defined. Please add it to your .env.local file."
      );
    }

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(mongoUri);
    // console.log("MongoDb Connected");
  } catch (err) {
    console.error("MongoDb connection error:", err);
    throw err;
  }
};
