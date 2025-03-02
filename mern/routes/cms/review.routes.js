const express = require('express');
const { Cms } = require("../../controllers");

const router = express.Router();

router.get('/',Cms.ReviewsCtrl.index)  // ✅ Fetch all categories

router.delete('/:id',Cms.ReviewsCtrl.destroy); // ✅ Delete category

module.exports = router;
