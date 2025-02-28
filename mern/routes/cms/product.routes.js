const express = require('express');
const { Cms } = require("../../controllers");
const {uploadFile} = require("../../lib")

const router = express.Router();

router.route('/')
    .get(Cms.productCtrl.index)   // ✅ Fetch all products
    .post(uploadFile().array('images'),Cms.productCtrl.store); // ✅ Create a new product

router.route('/:id') // ✅ Fixed route path
    .get(Cms.productCtrl.show)    // ✅ Fetch a single product (GET instead of POST)
    .put(uploadFile().array('images'),Cms.productCtrl.update)  // ✅ Update product (Full update)
    .patch(uploadFile().array('images'),Cms.productCtrl.update) // ✅ Update product (Partial update)
    .delete(Cms.productCtrl.destroy); // ✅ Delete product

module.exports = router;
