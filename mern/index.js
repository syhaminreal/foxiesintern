const express = require('express');
const routes = require('./routes');
const { config } = require('dotenv');
const mongoose = require('mongoose');

config(); // Load environment variables from .env file

const port = process.env.PORT_ADDR || 5000;  // Default to 5000 if PORT_ADDR is not set
const mongoAddr = process.env.MONGO_ADDR;


const app = express();

// Middleware
app.use(express.json());  // To parse JSON in requests
app.use(express.urlencoded())

app.use(routes);

// Error handling middleware
app.use((error, req, res, next) => {
    // console.error(error.stack);  // Log the error stack for debugging
    res.status(error.status || 500).json({
        error: error.message || 'Request execution error'
    });
});

// Server & MongoDB connection
app.listen(port, async () => {
    console.log(`Server started at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop');

    try {
        await mongoose.connect(mongoAddr, { });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process on connection error
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected');
        process.exit(0);  // Exit the process after MongoDB connection is closed
    });
});
