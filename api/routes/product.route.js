import express from 'express';
import Product from "../models/product.model.js"; // Assuming default export in the model
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'; // Named imports

const router = express.Router(); // Define the router

// Define your routes
router.get('/', getProducts);  // GET all products
router.get("/:id", getProduct);  // GET a specific product by ID
router.post("/", createProduct);  // POST a new product

// Update a product
router.put("/:id", updateProduct);  // PUT to update a product by ID

// Delete a product
router.delete("/:id", deleteProduct);  // DELETE a product by ID

export default router;  // Export the router
