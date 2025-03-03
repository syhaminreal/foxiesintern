const { showError, validationError } = require("../../lib")
const { Product } = require("../../models")

const {unlinkSync} = require('node: fs')

class ProductController {
    index = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                {$lookup: {from: 'categories', localField: 'categoryId',
                    foreignField: 'id', as: 'category'   }},

                    {$lookup: {from: 'brands', localField: 'brandId',
                        foreignField: 'id', as: 'brand'   }}
            ]).exec()

            let result = product.map(product => {
                return{
                    _id: product._id,
                    name: product.name,
                    summary: product.summary,
                    description: product.description,
                    price: product.price,
                    discounted_price: product.discounted_price,
                    images: product.images,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    categoryId: product.categoryId,
                    status: product.status,
                    updatedAt: product.updatedAt,
                    createdAt: product.createdAt,
                    category: product.category[0],
                    brand: product.brand[0],
                    __v: product.__v
                }
            })
             
            res.json(result)
        } catch (error) {
            showError(error, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name,summary, description,price, discounted_price, categoryId, brandId,featured,status } = req.body

            let images = req.files.map(file => file.filename)

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

             let product = await Product.findById(req.params.id)

             let images = [
                ...product.images,
                ...req.files.map(file => file.filename)
             ]
             product = await Product.findByIdAndUpdate(
                req.params.id,
                { name,summary, description,price, discounted_price, categgoryId, brandId,featured, status, images } )

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

            
            let product = await Product.findById(req.params.id)

            for(let image of product.images){
                unlinkSync(`uploads/${image}`)

            }

          product = await Product.findByIdAndDelete(req.params.id)  // Changed 'Brand' to 'Product'

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
