const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the Users collection
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurantCategory', // Reference to the RestaurantCategories collection
        required: true,
    },
    restaurantImg: {
        type: String, // Assuming you'll store image URLs or file paths as strings
    },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

module.exports = Restaurant;
