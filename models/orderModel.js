const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    billingDetails: {
        name: String,
        email: String,
        phoneNumber: Number,
        address: String,
        city: String,
        zip: String,
    },
    shippingInfo: {
        address: String,
        city: String,
        state:String ,
        country: String,
        pincode: Number,
        phoneNumber: Number
    },

    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    shippedAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
