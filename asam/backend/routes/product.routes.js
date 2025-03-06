const express = require('express');
const { ProductController } = require("../../controllers");
const { uploadFile } = require("../../lib");

const router = express.Router();

const mimeList = ['image/jpeg', 'image/png', 'image/gif'];

// Routes for products
router.route('/')
    .get(ProductController.index)   // Fetch all products
    .post(uploadFile(mimeList).array('images'), ProductController.store); // Create a new product

router.route('/:id') 
    .get(ProductController.show)    // Fetch a single product by ID
    .put(uploadFile(mimeList).array('images'), ProductController.update)  // Full update product
    .patch(uploadFile(mimeList).array('images'), ProductController.update) // Partial update product
    .delete(ProductController.destroy); // Delete product by ID

module.exports = router;
