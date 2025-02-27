const express = require('express')
const staffsRoutes = require("./staffs.routes") // ✅ Corrected variable name
const { adminUser } = require("../../lib")

const router = express.Router()

router.use('/staffs',adminUser, staffsRoutes) // ✅ Now it works

module.exports = router
