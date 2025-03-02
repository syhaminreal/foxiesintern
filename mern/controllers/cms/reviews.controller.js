const mongoose = require('mongoose');
const showError = require('../../lib');
const Review = require('../models');
const ReviewDetail = require('../models');
const Review = require('../models'); // Assuming a Review model exists

class ReviewsController {
    // Fetch user's reviews with their details and products
    index = async (req, res, next) => {
        try {
            const reviews = await Review.find({ userId: req.user._id }).exec();
            const result = [];

            for (let review of reviews) {
                const details = await ReviewDetail.aggregate([
                    { $match: { reviewId: new mongoose.Types.ObjectId(review._id) } },
                    {
                        $lookup: { from: 'products', localField: 'productId',
                            foreignField: '_id',    as: 'products' }},
                            {$lookup: {from: 'user', localField: 'userId', foreignField: '_id', as:'user'}}
                ]).exec();

                const temp = details.map(detail => ({
                    _id:review._id,
                    reviewId:review.reviewId,
                    productId:review.productId,
                    qty:review.qty,
                    price:review.price,
                    total:review.total,
                    createdAt:review.createdAt,
                    updatedAt:review.updatedAt,
                    __v:review.__v,
                    product:review.products.length > 0 ?review.products[0] : null,
                    user: review.user[0],
                }));

                result.push({
                    _id: review._id,
                    userId: review.userId,
                    status: review.status,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    __v: review.__v,
                   reviews: temp
                });
            }

            res.json(result);
        } catch (error) {
            showError(error, next);
        }
    };

    // Delete a review by ID
    destroy = async (req, res, next) => {
        try {
            const { reviewId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                return res.status(400).json({ error: 'Invalid review ID' });
            }

            const deletedReview = await Review.findByIdAndDelete(reviewId);
            if (!deletedReview) {
                return res.status(404).json({ error: 'Review not found' });
            }

            res.json({ message: 'Review deleted successfully' });
        } catch (error) {
            showError(error, next);
        }
    };
}

module.exports = new ReviewsController();
