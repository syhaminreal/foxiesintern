const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        enum: ['Admin', 'staff', 'Customer'],
        default: 'Customer'
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
});

const User = model('User', userSchema);
module.exports = User;
