const express = require('express');
const { Cms } = require("../../controllers");

const router = express.Router();

router.route('/')
    .get(Cms.BrandCtrl.index)  // ✅ Fetch all brands
    .post(Cms.BrandCtrl.store); // ✅ Create a new brand

router.route('/:id') // ✅ Fixed route path
    .get(Cms.BrandCtrl.show)   // ✅ Use GET for fetching a single brand
    .put(Cms.BrandCtrl.update)  // ✅ Update brand (Full update)
    .patch(Cms.BrandCtrl.update) // ✅ Update brand (Partial update)
    .delete(Cms.BrandCtrl.destroy); // ✅ Delete brand

module.exports = router;
