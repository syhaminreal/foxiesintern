import express from "express";
import { connectDb } from "./db/connectDB.js";
import  authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"


dotenv.config()

const app = express();

const PORT = process.env.PORT || 8000


//allows to parse incomming request wiht json payloads
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World! 12");
});

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port :", PORT);
});

//40.42