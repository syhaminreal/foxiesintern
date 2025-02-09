import express from "express";
import { connectDb } from "./db/connectDB.js";
import  authRoutes from "./routes/auth.route.js"


const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! 12");
});

app.use("/api/auth", authRoutes)

app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
