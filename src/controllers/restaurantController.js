const Restaurant = require('../models/restaurantModel'); 

// Create a new restaurant
async function createRestaurant(req, res) {
    try {
        const {
            name,
            description,
            address,
            phone_number,
            owner_id, // Assuming you have this value in the request
            category_id, // Assuming you have this value in the request
            restaurantImg, // Image URL or file path from Firebase Storage
        } = req.body;

        // Create a new restaurant document
        const newRestaurant = new Restaurant({
            name,
            description,
            address,
            phone_number,
            owner_id,
            category_id,
            restaurantImg, // Firebase Storage URL
        });

        // Save the restaurant to the database
        const savedRestaurant = await newRestaurant.save();

        res.status(201).json(savedRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Unable to create restaurant' });
    }
}

// Read restaurant by ID
async function getRestaurantById(req, res) {
    const restaurantId = req.params.restaurantId; // Assuming you use "restaurantId" as the route parameter

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error);
        res.status(500).json({ error: 'Unable to fetch restaurant' });
    }
}

// Read all restaurants
async function getAllRestaurants(req, res) {
    try {
        const restaurants = await Restaurant.find();

        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching all restaurants:', error);
        res.status(500).json({ error: 'Unable to fetch restaurants' });
    }
}

// Update restaurant
async function updateRestaurant(req, res) {
    try {
        const restaurantId = req.params.restaurantId; // Assuming you use "restaurantId" as the route parameter
        const updateData = req.body; // Data to update

        // Use findOneAndUpdate to find and update the restaurant by ID
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: restaurantId },
            updateData,
            { new: true } // Return the updated restaurant
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(updatedRestaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Unable to update restaurant' });
    }
}

// Delete restaurant
async function deleteRestaurantById(req, res) {
    const restaurantId = req.params.restaurantId; // Assuming you use "restaurantId" as the route parameter

    try {
        // Use findByIdAndRemove to find and delete the restaurant by ID
        const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.status(204).send(); // Respond with a 204 No Content status (successful deletion)
    } catch (error) {
        console.error('Error deleting restaurant by ID:', error);
        res.status(500).json({ error: 'Unable to delete restaurant' });
    }
}

module.exports = {
    createRestaurant,
    getRestaurantById,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurantById,
};
