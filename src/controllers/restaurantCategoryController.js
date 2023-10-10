const RestaurantCategory = require('../models/restaurantCategoryModel');

// Create a new restaurant category
async function createRestaurantCategory(req, res) {
    try {
        const { name, description } = req.body;

        // Create a new restaurant category document
        const newCategory = new RestaurantCategory({
            name,
            description,
        });

        // Save the category to the database
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error('Error creating restaurant category:', error);
        res.status(500).json({ error: 'Unable to create restaurant category' });
    }
}

// Read all restaurant categories
async function getAllRestaurantCategories(req, res) {
    try {
        const categories = await RestaurantCategory.find();

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching all restaurant categories:', error);
        res.status(500).json({ error: 'Unable to fetch restaurant categories' });
    }
}

// Read a restaurant category by ID
async function getRestaurantCategoryById(req, res) {
    const categoryId = req.params.categoryId;

    try {
        const category = await RestaurantCategory.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Restaurant category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching restaurant category by ID:', error);
        res.status(500).json({ error: 'Unable to fetch restaurant category' });
    }
}

// Update a restaurant category by ID
async function updateRestaurantCategory(req, res) {
    try {
        const categoryId = req.params.categoryId;
        const updateData = req.body;

        // Use findOneAndUpdate to find and update the category by ID
        const updatedCategory = await RestaurantCategory.findByIdAndUpdate(
            categoryId,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Restaurant category not found' });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating restaurant category:', error);
        res.status(500).json({ error: 'Unable to update restaurant category' });
    }
}

// Delete a restaurant category by ID
async function deleteRestaurantCategoryById(req, res) {
    const categoryId = req.params.categoryId;

    try {
        const deletedCategory = await RestaurantCategory.findByIdAndRemove(
            categoryId
        );

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Restaurant category not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting restaurant category by ID:', error);
        res.status(500).json({ error: 'Unable to delete restaurant category' });
    }
}

module.exports = {
    createRestaurantCategory, getAllRestaurantCategories, getRestaurantCategoryById, updateRestaurantCategory, deleteRestaurantCategoryById,
};
