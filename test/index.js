import express from "express";
import { connectDb } from "./db/connectDB.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! 12");
});

app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
