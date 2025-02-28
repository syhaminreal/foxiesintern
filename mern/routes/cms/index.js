const express = require('express');
const staffsRoutes = require("./staffs.routes"); // ✅ Corrected variable name
const categoriesRoutes = require("./categories.routes"); // ✅ Corrected variable name
const customerRoutes = require("./customer.routes"); // ✅ Added customer routes
const brandRoutes = require("./brand.routes"); // ✅ Added brand routes
const { adminUser } = require("../../lib");

const router = express.Router();

router.use('/staffs', adminUser, staffsRoutes); // ✅ Staff routes with adminUser middleware
router.use('/categories', categoriesRoutes); // ✅ Categories routes
router.use('/customers', customerRoutes); // ✅ Customer routes
router.use('/brands', brandRoutes); // ✅ Brand routes

module.exports = router;
