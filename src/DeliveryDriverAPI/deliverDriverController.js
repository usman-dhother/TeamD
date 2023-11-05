const DeliveryDriver = require('../models/deliveryDriverModel');

async function createDeliveryDriver(req, res) {
    try {
        const {
            user_id,
            vehicle_type,
            license_plate,
            availability
        } = req.body;

        const newDeliveryDriver = new DeliveryDriver({
            user_id,
            vehicle_type,
            license_plate,
            availability
        });

        const savedDriver = await newDeliveryDriver.save();

        res.status(201).json(savedDriver);
    } catch (error) {
        console.error('Error creating delivery driver:', error);
        res.status(500).json({ error: 'Unable to create delivery driver' });
    }
}

async function getDeliveryDriverById(req, res) {
    const driverId = req.params.driverId;

    try {
        const driver = await DeliveryDriver.findById(driverId);

        if (!driver) {
            return res.status(404).json({ error: 'Delivery driver not found' });
        }

        res.status(200).json(driver);
    } catch (error) {
        console.error('Error fetching delivery driver by ID:', error);
        res.status(500).json({ error: 'Unable to fetch delivery driver' });
    }
}

async function getAllDeliveryDrivers(req, res) {
    try {
        const drivers = await DeliveryDriver.find();

        res.status(200).json(drivers);
    } catch (error) {
        console.error('Error fetching all delivery drivers:', error);
        res.status(500).json({ error: 'Unable to fetch delivery drivers' });
    }
}

async function updateDeliveryDriver(req, res) {
    try {
        const driverId = req.params.driverId;
        const updateData = req.body;

        const updatedDriver = await DeliveryDriver.findByIdAndUpdate(driverId, updateData, { new: true });

        if (!updatedDriver) {
            return res.status(404).json({ error: 'Delivery driver not found' });
        }

        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating delivery driver:', error);
        res.status(500).json({ error: 'Unable to update delivery driver' });
    }
}

async function deleteDeliveryDriverById(req, res) {
    const driverId = req.params.driverId;

    try {
        const deletedDriver = await DeliveryDriver.findByIdAndRemove(driverId);

        if (!deletedDriver) {
            return res.status(404).json({ error: 'Delivery driver not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting delivery driver by ID:', error);
        res.status(500).json({ error: 'Unable to delete delivery driver' });
    }
}

module.exports = {
    createDeliveryDriver, getDeliveryDriverById, getAllDeliveryDrivers, updateDeliveryDriver, deleteDeliveryDriverById
};