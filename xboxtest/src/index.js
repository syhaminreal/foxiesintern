import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Error handling

// Server listening
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
