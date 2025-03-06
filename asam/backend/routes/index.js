const express = require('express');
const router = express.Router();
const productRoutes = require("./product.routes"); // Ensure the path is correct
const orderRoutes = require('./orderRoutes');      // Example if you have order routes
const listRoutes = require('./listRoutes');        // Example if you have list routes
const authRoutes = require('./authRoutes');        // Example if you have auth routes

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Use the imported routes here
router.use('/auth', authRoutes);
router.use('/products', productRoutes);  // Attach product routes under '/products'
router.use('/orders', orderRoutes);      // Attach order routes under '/orders'
router.use('/list', listRoutes);         // Attach list routes under '/list'

// Export the router which contains all the routes
module.exports = router;
