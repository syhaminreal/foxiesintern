const { Schema, model } = require('mongoose');

const Product = model('Product', new Schema({
    // ... properties of a product ...
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}));

module.exports = Product;
