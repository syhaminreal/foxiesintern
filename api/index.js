import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import productRoute from "./routes/product.route.js";
import cors from "cors";
import { app } from "./app.js"; // Importing app.js

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Listening ");
});

// //routes import
// import userRouter from './routes/user.route.js'

// //routes declaration
// app.use("/api/v1/users", userRouter)

mongoose
  .connect(
    "mongodb+srv://shyam9876yadav:sam123@cluster0.rvvuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });