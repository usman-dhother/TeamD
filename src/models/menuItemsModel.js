const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Reference to the Restaurants collection
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: String,
        enum: ['In stock', 'Out of stock'],
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('MenuItem', menuItemsSchema,'menuItems');
