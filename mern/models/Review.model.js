const { Schema, model } = require('mongoose');

const Review = model('Review', new Schema({
    // ... properties of a review ...
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}));

module.exports = Review;
