const express = require("express");
const Controller = require("../controllers/Controller");

const router = express.Router();

// Category Routes
router.get("/categories", Controller.categories);
router.get("/categories/:id", Controller.categoriesById);

// Brand Routes
router.get("/brands", Controller.brands);
router.get("/brands/:id", Controller.brandById);

// Product Routes
router.get("/products/latest", Controller.latest);
router.get("/products/featured", Controller.featured);
router.get("/products/top-selling", Controller.topSelling);
router.get("/products/:id", Controller.byId);
router.get("/products/category/:id", Controller.byCategoryId);
router.get("/products/brand/:id", Controller.byBrandId);
router.get("/products/similar/:id", Controller.similar);
router.get("/products/search", Controller.search);

module.exports = router;
