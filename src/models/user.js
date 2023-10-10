const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId, // Unique identifier for the user
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    first_name: String,
    last_name: String,
    phone_number: String,
    address: String,
    payment_info_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paymentInfo',
    },
    user_type: {
        type: String,
        required: true,
    },
    location: {
        type: String
    },
    notification: {
        type: Boolean
    },


});

// Create and export the User model
const User = mongoose.model('user', userSchema, 'user');


module.exports = User;
