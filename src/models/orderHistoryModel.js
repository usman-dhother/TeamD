const mongoose = require('mongoose');

// Define the OrderStatusHistory Schema
const orderStatusHistorySchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Foreign Key reference to Orders
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the OrderStatusHistory model
const OrderStatusHistory = mongoose.model('orderHistory', orderStatusHistorySchema, 'orderHistory');

module.exports = OrderStatusHistory;
