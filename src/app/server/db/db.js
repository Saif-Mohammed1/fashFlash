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

const connectDB = async () => {
  if (isConnected) {
    //console.log("Using existing MongoDB connection");
    // getDB();
    return;
  }
  try {
    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    //console.log("MongoDB connected");
  } catch (error) {
    //console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    //console.log("MongoDB disconnected");
  } catch (error) {
    //console.error("Error disconnecting from MongoDB:", error);
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
