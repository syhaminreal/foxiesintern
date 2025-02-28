const express = require('express');
const { Cms } = require("../../controllers");

const router = express.Router();

router.route('/')
    .get(Cms.customerCtrl.index)   // ✅ Fetch all customers
    .post(Cms.customerCtrl.store); // ✅ Create a new customer

router.route('/:id') // ✅ Fixed route path
    .get(Cms.customerCtrl.show)    // ✅ Fetch a single customer (GET instead of POST)
    .put(Cms.customerCtrl.update)  // ✅ Update customer (Full update)
    .patch(Cms.customerCtrl.update) // ✅ Update customer (Partial update)
    .delete(Cms.customerCtrl.destroy); // ✅ Delete customer

module.exports = router;
