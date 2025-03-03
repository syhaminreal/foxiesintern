const { Schema, model } = require('mongoose');

const Product = model('Product', new Schema({
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discounted_price: {
        type: Schema.Types.ObjectId,
        ref: 'Price',  // Assuming 'Price' is the referenced model
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',  // Assuming 'Category' is the referenced model
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',  // Assuming 'Brand' is the referenced model
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
}));

module.exports = Product;
