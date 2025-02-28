const { showError, validationError } = require("../../lib")
const { Product } = require("../../models")

class ProductController {
    index = async (req, res, next) => {
        try {
            const products = await Product.find()  // Changed 'Brand' to 'Product'
            res.json(products)
        } catch (error) {
            showError(error, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name,summary, description,price, discounted_price, categoryId, brandId,featured,status } = req.body

            let images = files.map(file => file.filename)

            await Product.create({ name,summary, description,price, discounted_price, categoryId, brandId,featured, status, images })  // Changed 'Brand' to 'Product'

            res.status(201).json({
                success: "Product created.",
            })

        } catch (err) {
            validationError(err, next)
        }
    }

    show = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id)  // Changed 'Brand' to 'Product'

            if (product) {
                res.json(product)
            } else {
                next({
                    message: "Product not found",  // Changed 'Brand' to 'Product'
                    status: 404,
                })
            }
        } catch (error) {
            showError(error, next)
        }
    }

    update = async (req, res, next) => {
        try {
            const { name ,summary, description,price, discounted_price, categgoryId, brandId,featured,status } = req.body

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { name,summary, description,price, discounted_price, categgoryId, brandId,featured, status } )

            if (product) {
                res.json({ success: "Product Updated." })
            } else {
                next({
                    message: "Product not found",  // Changed 'Brand' to 'Product'
                    status: 404,
                })
            }
        } catch (err) {
            validationError(err, next)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)  // Changed 'Brand' to 'Product'

            if (product) {
                res.json({ success: "Product removed." })
            } else {
                next({
                    message: "Product not found",  // Changed 'Brand' to 'Product'
                    status: 404,
                })
            }
        } catch (error) {
            showError(error, next)
        }
    }
}

module.exports = new ProductController()
