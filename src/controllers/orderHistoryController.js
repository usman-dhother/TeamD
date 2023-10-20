const OrderStatusHistory = require('../models/orderHistoryModel');

// Create a new order status history entry
async function createOrderStatusHistory(req, res) {
    try {
        const { order_id, status } = req.body;

        const newOrderStatusHistory = new OrderStatusHistory({
            order_id,
            status,
        });

        const savedOrderStatusHistory = await newOrderStatusHistory.save();

        res.status(201).json(savedOrderStatusHistory);
    } catch (error) {
        console.error('Error creating order status history entry:', error);
        res.status(500).json({ error: 'Unable to create order status history entry' });
    }
}

// Read order status history entry by ID
async function getOrderStatusHistoryById(req, res) {
    const historyId = req.params.historyId;

    try {
        const orderStatusHistory = await OrderStatusHistory.findById(historyId);

        if (!orderStatusHistory) {
            return res.status(404).json({ error: 'Order status history entry not found' });
        }

        res.status(200).json(orderStatusHistory);
    } catch (error) {
        console.error('Error fetching order status history entry by ID:', error);
        res.status(500).json({ error: 'Unable to fetch order status history entry' });
    }
}

// Read all order status history entries
async function getAllOrderStatusHistory(req, res) {
    try {
        const orderStatusHistoryEntries = await OrderStatusHistory.find();

        res.status(200).json(orderStatusHistoryEntries);
    } catch (error) {
        console.error('Error fetching all order status history entries:', error);
        res.status(500).json({ error: 'Unable to fetch order status history entries' });
    }
}

// Update order status history entry
async function updateOrderStatusHistory(req, res) {
    try {
        const historyId = req.params.historyId;
        const updateData = req.body;

        const updatedOrderStatusHistory = await OrderStatusHistory.findOneAndUpdate(
            { _id: historyId },
            updateData,
            { new: true }
        );

        if (!updatedOrderStatusHistory) {
            return res.status(404).json({ error: 'Order status history entry not found' });
        }

        res.json(updatedOrderStatusHistory);
    } catch (error) {
        console.error('Error updating order status history entry:', error);
        res.status(500).json({ error: 'Unable to update order status history entry' });
    }
}

// Delete order status history entry
async function deleteOrderStatusHistoryById(req, res) {
    const historyId = req.params.historyId;

    try {
        const deletedOrderStatusHistory = await OrderStatusHistory.findByIdAndRemove(historyId);

        if (!deletedOrderStatusHistory) {
            return res.status(404).json({ error: 'Order status history entry not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting order status history entry by ID:', error);
        res.status(500).json({ error: 'Unable to delete order status history entry' });
    }
}

module.exports = {
    createOrderStatusHistory, getOrderStatusHistoryById, getAllOrderStatusHistory, updateOrderStatusHistory, deleteOrderStatusHistoryById,
};
