// // pages/api/db.js

// import mongoose from "mongoose";

// const uri = process.env.MONGODB_URI; // Replace this with your MongoDB connection URI

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", //console.error.bind(//console, "connection error:"));
// db.once("open", function () {
//   //console.log("Connected to MongoDB");
// });

// // Define your schema and models here

// // API logic using MongoDB models and operations
// // You can perform CRUD operations here
import mongoose from "mongoose";

let isConnected = false;
const MAX_RETRIES = 3; // Number of retries
const RETRY_DELAY = 3000; // Wait 3 seconds before retrying

const connectDB = async (retryCount = 0) => {
  // if (isConnected) {
  //   return;
  // }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB URI is required");
    }

    // Attempt to connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "e-commerce",
    });

    isConnected = true;

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    // // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection (${retryCount + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return connectDB(retryCount + 1);
    } else {
      console.error("Max retries reached. Could not connect to MongoDB.");
      throw error; // Stop if max retries exceeded
    }
  }
};

const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};

const getDB = () => {
  if (!isConnected) {
    throw new Error("No active connection to MongoDB");
  }
  return mongoose.connection;
};

export { connectDB, disconnectDB, getDB };
