const showError = require('../../lib')
const { User, Review, Order, OrderDetail, Product } = require("../../models");
const bcrypt =require('bcryptjs')
const mongoose = require("mongoose");

class ProfileController {
    // Fetch user details
    details = async (req, res, next) => {
        res.json(req.user);
    };

    // Update profile
    profile = async (req, res, next) => {
        try {
            const { name, phone, address } = req.body;

            const user = await User.findByIdAndUpdate(
                req.user._id,
                { name, phone, address },
                { new: true }
            );

            if (user) {
                res.json({ success: "Profile Updated." });
            } else {
                next({
                    message: "User not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    // Update password
    password = async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;

            if (bcrypt.compareSync(oldPassword, req.user.password)) {
                if (newPassword === confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
                    const user = await User.findByIdAndUpdate(req.user._id, { password: hash });

                    if (user) {
                        res.json({ success: "Password Updated." });
                    } else {
                        next({
                            message: "User not found",
                            status: 404,
                        });
                    }
                } else {
                    next({
                        message: "Password confirmation does not match.",
                        status: 422,
                    });
                }
            } else {
                next({
                    message: "Old password is incorrect.",
                    status: 422,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    // Add a review
    addReview = async (req, res, next) => {
        try {
            const { rating, comment } = req.body;

            await Review.create({
                rating,
                comment,
                userId: req.user._id,
                productId: req.params.id, // Fixed `Id` to `id`
            });

            res.json({
                success: "Thank you for your review.",
            });
        } catch (err) {
            showError(err, next);
        }
    };

    // Get user's reviews
    reviews = async (req, res, next) => {
        try {
            const review = await Review.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product",
                    },
                },
            ]).exec();

            const result = review.map((review) => ({
                _id: review._id,
                comment: review.comment, // Fixed incorrect field reference
                rating: review.rating,
                productId: review.productId,
                userId: review.userId,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                __v: review.__v,
                product: review.product[0],
            }));

            res.json(result);
        } catch (err) {
            showError(err, next);
        }
    };

    // Fetch user's orders
    orders = async (req, res, next) => {
        try {
            const orders = await Order.find({ userId: req.user._id })
                .populate({
                    path: "orderDetails",
                    populate: { path: "productId", model: "Product" },
                })
                .exec();

            res.json(orders);
        } catch (error) {
            showError(error, next);
        }
    };

    // Checkout process
    checkout = async (req, res, next) => {
        try {
            const cart = req.body;

            const order = await Order.create({ userId: req.user._id });

            for (let item of cart) {
                const product = await Product.findById(item.productId);
                const price = product.discounted_price
                    ? parseFloat(product.discounted_price)
                    : product.price;

                await OrderDetail.create({
                    orderId: order._id,
                    productId: item.productId,
                    qty: item.qty,
                    price,
                    total: price * item.qty,
                });
            }

            res.json({ success: "Thank you for your order." });
        } catch (err) {
            showError(err, next);
        }
    };
}

module.exports = new ProfileController();