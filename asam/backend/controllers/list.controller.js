const { showError } = require("../../lib");
const { Category, Brand, Product, Review } = require('../../models');
const { default: mongoose } = require('mongoose');

class Controller {

    // ListController methods

    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({
                status: true
            }).exec();

            res.json(categories);
            
        } catch (err) {
            showError(err, next);
        }
    }

    categoriesById = async (req, res, next) => {
        try {
            const category = await Category.findById({ _id: req.params.id, status: true }).exec();

            if (category) {
                res.json(category);
            } else {
                next({
                    Message: "Category not found",
                    status: 404
                });
            }
        } catch (err) {
            showError(err, next);
        }
    }

    brands = async (req, res, next) => {
        try {
            const brands = await Brand.find({
                status: true
            }).exec();

            res.json(brands);
            
        } catch (err) {
            showError(err, next);
        }
    }

    brandById = async (req, res, next) => {
        try {
            const brand = await Brand.findById({ _id: req.params.id, status: true }).exec();

            if (brand) {
                res.json(brand);
            } else {
                next({
                    Message: "Brand not found",
                    status: 404
                });
            }
        } catch (err) {
            showError(err, next);
        }
    }

    // ProductController methods

    latest = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true }).sort({ createdAt: 'desc' }).exec();
            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }

    featured = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, featured: true }).exec();
            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }

    topSelling = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $match: { status: true } },
                { $lookup: { from: 'orderdetails', localField: '_id', foreignField: 'productId', as: 'order_count' } },
                { $addFields: { order_count: { $size: '$order_count' } } }
            ]).sort({ 'order_count': 'desc' }).exec();

            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }

    byId = async (req, res, next) => {
        try {
            const product = await Product.findOne({ _id: req.params.id, status: true }).exec();

            if (product) {
                const reviews = await Review.aggregate([
                    { $match: { productId: new mongoose.Types.ObjectId(product._id) } },
                    { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }
                ]).exec();

                const result = reviews.map(review => {
                    return {
                        _id: review._id,
                        productId: review.productId,
                        userId: review.userId,
                        comment: review.comment,
                        rating: review.rating,
                        createdAt: review.createdAt,
                        updatedAt: review.updatedAt,
                        __v: review.__v,
                        user: review.user[0],
                    };
                });

                const brand = await Brand.findById(product.brandId);

                res.json({
                    _id: product._id,
                    name: product.name,
                    summary: product.summary,
                    description: product.description,
                    price: product.price,
                    discounted_price: product.discounted_price,
                    images: product.images,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    status: product.status,
                    featured: product.featured,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    __v: product.__v,
                    reviews: result,
                    brand
                });
            } else {
                next({
                    Message: "Product not found.",
                    status: 404
                });
            }

        } catch (err) {
            showError(err, next);
        }
    }

    byCategoryId = async (req, res, next) => {
        try {
            const products = await Product.find({ categoryId: req.params.id, status: true }).exec();
            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }

    byBrandId = async (req, res, next) => {
        try {
            const products = await Product.find({ brandId: req.params.id, status: true }).exec();
            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }

    similar = async (req, res, next) => {
        try {
            const product = await Product.findOne({ _id: req.params.id, status: true }).exec();

            if (product) {
                const products = await Product.find({ categoryId: product.categoryId, status: true, _id: { $ne: product._id } }).exec();
                res.json(products);
            } else {
                next({
                    Message: "Product not found.",
                    status: 404
                });
            }

        } catch (err) {
            showError(err, next);
        }
    }

    search = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $match: { status: true, name: { $regex: req.query.term, $options: 'i' } } }
            ]).exec();
            res.json(products);
            
        } catch (err) {
            showError(err, next);
        }
    }
}

module.exports = new Controller();
