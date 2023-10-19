const mongoose = require('mongoose');

// Define the PaymentInfo Schema
const paymentInfoSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Foreign Key reference to Users
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    card_number: {
        type: String,
        required: true,
    },
    expiration_date: {
        type: String,
        required: true,
    },
    billing_address: String,
    zip_code: String,
    state: String,
});

// Create and export the PaymentInfo model
const PaymentInfo = mongoose.model('PaymentInfo', paymentInfoSchema, 'paymentInfo');

module.exports = PaymentInfo;
