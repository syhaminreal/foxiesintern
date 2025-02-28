const express = require('express');
const { Cms } = require("../../controllers");
const {uploadFile} = require("../../lib")

const router = express.Router();

const mimeList = ['image/jpeg', 'image/png', 'image/gif']

router.route('/')
    .get(Cms.productCtrl.index)   // ✅ Fetch all products
    .post(uploadFile(mimeList).array('images'),Cms.ProductsCtrl.store); // ✅ Create a new product

router.route('/:id') // ✅ Fixed route path
    .get(Cms.productCtrl.show)    // ✅ Fetch a single product (GET instead of POST)
    .put(uploadFile(mimeList).array('images'),Cms.ProductsCtrl.update)  // ✅ Update product (Full update)
    .patch(uploadFile(mimeList).array('images'),Cms.ProductsCtrl.update) // ✅ Update product (Partial update)
    .delete(Cms.ProductsCtrl.destroy); // ✅ Delete product

module.exports = router;
