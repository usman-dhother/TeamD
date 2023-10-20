const mongoose = require('mongoose');

// Define the OrderItem Schema
const orderItemSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Foreign Key reference to Orders
        required: true,
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem', // Foreign Key reference to MenuItems
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
});

// Create and export the OrderItem model
const OrderItem = mongoose.model('OrderItem', orderItemSchema, 'orderItems');

module.exports = OrderItem;
