const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {   
        orderItems: [{
            name: {type: String, required: true, unique: true},
            type: {type: String, required: true},
            price: {type: Number, required: true},
            amount: {type: Number, required: true},
            image: {type: String, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }],
        shippingAddress: {
            address: {type: String, required: true},
            city: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true},
            phone: {type: String, required: true},
        },
        paymentMethod: {type: String, required: true},
        totalPrice: {type: Number, required: true},
        paidAt: {type: Date},
        createdAt: {type: Date, default: Date.now},
        isPaid:{type: Boolean, default: false},
        deliveredAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        itemPrice: {type: Number, required: true},
        shippingPrice: {type: Number, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }
    },

);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;