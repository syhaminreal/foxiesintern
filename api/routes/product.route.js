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



//paginate the products lsit

router.get("/products", async (req, res) => {
    try {
      let { page, limit } = req.query;
      page = parseInt(page) || 1; // Default to page 1
      limit = parseInt(limit) || 10; // Default to 10 items per page
  
      const skip = (page - 1) * limit;
      const products = await Product.find().skip(skip).limit(limit);
      const total = await Product.countDocuments();
  
      res.json({
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
export default router;  // Export the router
