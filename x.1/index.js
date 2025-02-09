const express = require("express");
const routes = require("./routes");
const { config } = require("dotenv");
const mongoose = require("mongoose");

config();

const port = process.env.PORT_ADDR || 5000; // Default port if not defined in .env
const mongoAddr = process.env.MONGO_ADDR;

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use defined routes
app.use(routes);

// Global error-handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message || "Internal Server Error" });
});

// Connect to MongoDB before starting the server
mongoose
  .connect(mongoAddr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
      console.log("Press Ctrl + C to stop");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });
