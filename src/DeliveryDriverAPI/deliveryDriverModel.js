const mongoose = require('mongoose');

// Define the DeliveryDriver Schema
const deliveryDriverSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Foreign Key reference to Users
        required: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    license_plate: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        enum: ['Available', 'On Delivery', 'Offline'],
        required: true,
    },
});

// Create and export the DeliveryDriver model
const DeliveryDriver = mongoose.model('DeliveryDriver', deliveryDriverSchema, 'deliveryDriver');

module.exports = DeliveryDriver;
