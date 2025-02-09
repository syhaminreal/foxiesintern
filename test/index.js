import express from "express";
import { connectDb } from "./db/connectDB.js";
import  authRoutes from "./routes/auth.route.js"


const app = express();

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("Hello World! 12");
});

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port :", PORT);
});
