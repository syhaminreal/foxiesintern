const express = require("express");
const { front } = require("../../controllers");

const router = express.Router();

router.get("/products/latest", front.productCtrl.latest);
router.get("/products/featured", front.productCtrl.featured);
router.get("/products/topselling", front.productCtrl.topSelling);
router.get("/products/:id", front.productCtrl.byId);
router.get("/products/category/:id", front.productCtrl.byCategoryId);
router.get("/products/brand/:id", front.productCtrl.byBrandId);
router.get("/products/similar/:id", front.productCtrl.similar);
router.get("/products/search", front.productCtrl.search);

module.exports = router;
