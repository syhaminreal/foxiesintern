const express = require('express');
const { Cms } = require("../../controllers");

const router = express.Router();

router.route('/')
    .get(Cms.StaffsCtrl.index)   // ✅ Fetch all staff
    .post(Cms.StaffsCtrl.store); // ✅ Create a new staff

router.route('/:id') // ✅ Fixed route path
    .get(Cms.StaffsCtrl.show)    // ✅ Fetch a single staff (GET instead of POST)
    .put(Cms.StaffsCtrl.update)  // ✅ Update staff (Full update)
    .patch(Cms.StaffsCtrl.update) // ✅ Update staff (Partial update)
    .delete(Cms.StaffsCtrl.destroy); // ✅ Delete staff

module.exports = router;
