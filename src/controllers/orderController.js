const Order = require('../models/orderModel');

// Create a new order
async function createOrder(req, res) {
    try {
        const {
            user_id,
            restaurant_id,
            order_status,
            delivery_address,
            total_price,
            payment_info_id,
        } = req.body;

        const newOrder = new Order({
            user_id,
            restaurant_id,
            order_status,
            delivery_address,
            total_price,
            payment_info_id,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Unable to create order' });
    }
}

// Read order by ID
async function getOrderById(req, res) {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Unable to fetch order' });
    }
}

// Read all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
}

// Get all orders for a specific user
async function getOrdersByUserId(req, res) {
    const userId = req.params.userId;

    try {
        const userOrders = await Order.find({ user_id: userId });

        res.status(200).json(userOrders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Unable to fetch user orders' });
    }
}

// Update order
async function updateOrder(req, res) {
    try {
        const orderId = req.params.orderId;
        const updateData = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Unable to update order' });
    }
}

// Delete order
async function deleteOrderById(req, res) {
    const orderId = req.params.orderId;

    try {
        const deletedOrder = await Order.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting order by ID:', error);
        res.status(500).json({ error: 'Unable to delete order' });
    }
}

module.exports = {
    createOrder, getOrderById, getAllOrders, getOrdersByUserId, updateOrder, deleteOrderById,
};
