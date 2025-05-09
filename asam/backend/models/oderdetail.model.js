const { Schema, model } = require('mongoose');

const OrderDetail = model('OrderDetail', new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',  // Correct model reference
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  // Correct model reference
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
}));

module.exports = OrderDetail;
