const express = require('express')
const productRouter = require("./product.routes")
const listRouter = require("./list.routes")


const router = express.Router()

router.use(productRoutes)

router.use(listRoutes)


module.exports = router