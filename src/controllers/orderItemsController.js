const OrderItem = require('../models/orderItemModel');

// Create a new order item
async function createOrderItem(req, res) {
    try {
        const { order_id, item_id, quantity, subtotal } = req.body;

        const newOrderItem = new OrderItem({
            order_id,
            item_id,
            quantity,
            subtotal,
        });

        const savedOrderItem = await newOrderItem.save();

        res.status(201).json(savedOrderItem);
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).json({ error: 'Unable to create order item' });
    }
}

// Read order item by ID
async function getOrderItemById(req, res) {
    const orderItemId = req.params.orderItemId;

    try {
        const orderItem = await OrderItem.findById(orderItemId);

        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error('Error fetching order item by ID:', error);
        res.status(500).json({ error: 'Unable to fetch order item' });
    }
}

// Read all order items
async function getAllOrderItems(req, res) {
    try {
        const orderItems = await OrderItem.find();

        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching all order items:', error);
        res.status(500).json({ error: 'Unable to fetch order items' });
    }
}

// Update order item
async function updateOrderItem(req, res) {
    try {
        const orderItemId = req.params.orderItemId;
        const updateData = req.body;

        const updatedOrderItem = await OrderItem.findOneAndUpdate(
            { _id: orderItemId },
            updateData,
            { new: true }
        );

        if (!updatedOrderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        res.json(updatedOrderItem);
    } catch (error) {
        console.error('Error updating order item:', error);
        res.status(500).json({ error: 'Unable to update order item' });
    }
}

// Delete order item
async function deleteOrderItemById(req, res) {
    const orderItemId = req.params.orderItemId;

    try {
        const deletedOrderItem = await OrderItem.findByIdAndRemove(orderItemId);

        if (!deletedOrderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting order item by ID:', error);
        res.status(500).json({ error: 'Unable to delete order item' });
    }
}

module.exports = {
    createOrderItem, getOrderItemById, getAllOrderItems, updateOrderItem, deleteOrderItemById,
};
