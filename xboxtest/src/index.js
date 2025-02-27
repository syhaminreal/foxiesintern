import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js'; // Assuming you have an Express app instance

// Load environment variables
dotenv.config({
  path: './.env', // Make sure your .env file is in the root directory
});

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!', err);
  });



// // require('dotenv').config({path: './env'})
// import dotenv from "dotenv"
// import {connectDB} from "./db/index.js"
// import {app} from "./app.js"

// dotenv.config({
//     path : './.env'
// })

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Server is running at port : ${process.env.PORT}`)
//     })
// })

// .catch((err) => {
//     console.log("MONGO db connection failed !!!", err)})
// import mongoose from "mongoose";
// import express from "express";

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("Database connected successfully");

//         app.on("error", (error) => {
//             console.error("Express Error:", error);
//             throw error;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         });

//     } catch (error) {
//         console.error("Database Connection Error:", error);
//         throw error; // Corrected the typo (was `throw err`)
//     }
// })();
