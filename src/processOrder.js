const Order = require('../models/orderModel');

async function processOrder(orderId) {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            console.log('Order not found.');
            return;
        }

        // Simulate a random delay between 1 and 5 minutes (in milliseconds)
        const inProgressDelay = Math.floor(Math.random() * (5 * 60 * 1000 - 1 * 60 * 1000) + 1 * 60 * 1000);
        console.log(`Order ID ${orderId}: In Progress delay - ${inProgressDelay / 1000} seconds`);
        
        // Set inProgress to true after the random delay
        setTimeout(async () => {
            order.order_status = 'In Progress';
            await order.save();
            console.log(`Order ID ${orderId}: In Progress set to true`);
            
            // Simulate a random delay between 5 and 15 minutes (in milliseconds)
            const completedDelay = Math.floor(Math.random() * (15 * 60 * 1000 - 5 * 60 * 1000) + 5 * 60 * 1000);
            console.log(`Order ID ${orderId}: Completed delay - ${completedDelay / 1000} seconds`);
            
            // Set completed to true after the second random delay
            setTimeout(async () => {
                order.order_status = 'Completed';
                await order.save();
                console.log(`Order ID ${orderId}: Completed set to true`);
            }, completedDelay);
        }, inProgressDelay);
    } catch (error) {
        console.error(`Error processing order ID ${orderId}:`, error);
    }
}