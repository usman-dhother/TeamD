const mongoose = require('mongoose');

const restaurantCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('RestaurantCategory', restaurantCategorySchema,'restaurantCategory');
