const express = require('express');
const { Cms } = require("../../controllers");

const router = express.Router();

router.route('/')
    .get(Cms.CategoriesCtrl.index)  // ✅ Fetch all categories
    .post(Cms.CategoriesCtrl.store); // ✅ Create a new category

router.route('/:id') // ✅ Fixed route path
    .get(Cms.CategoriesCtrl.show)   // ✅ Use GET for fetching a single category
    .put(Cms.CategoriesCtrl.update)  // ✅ Update category (Full update)
    .patch(Cms.CategoriesCtrl.update) // ✅ Update category (Partial update)
    .delete(Cms.CategoriesCtrl.destroy); // ✅ Delete category

module.exports = router;
