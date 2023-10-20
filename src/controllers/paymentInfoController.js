const PaymentInfo = require('../models/paymentInfoModel');

// Create a new payment information entry
async function createPaymentInfo(req, res) {
    try {
        const { user_id, payment_method, card_number, expiration_date, billing_address, zip_code, state } = req.body;

        const newPaymentInfo = new PaymentInfo({
            user_id,
            payment_method,
            card_number,
            expiration_date,
            billing_address,
            zip_code,
            state,
        });

        const savedPaymentInfo = await newPaymentInfo.save();

        res.status(201).json(savedPaymentInfo);
    } catch (error) {
        console.error('Error creating payment information entry:', error);
        res.status(500).json({ error: 'Unable to create payment information entry' });
    }
}

// Read payment information entry by ID
async function getPaymentInfoById(req, res) {
    const paymentInfoId = req.params.paymentInfoId;

    try {
        const paymentInfo = await PaymentInfo.findById(paymentInfoId);

        if (!paymentInfo) {
            return res.status(404).json({ error: 'Payment information entry not found' });
        }

        res.status(200).json(paymentInfo);
    } catch (error) {
        console.error('Error fetching payment information entry by ID:', error);
        res.status(500).json({ error: 'Unable to fetch payment information entry' });
    }
}

// Get payment information for a specific user
async function getPaymentInfoByUserId(req, res) {
    const userId = req.params.userId;

    try {
        const userPaymentInfo = await PaymentInfo.find({ user_id: userId });

        res.status(200).json(userPaymentInfo);
    } catch (error) {
        console.error('Error fetching user payment information:', error);
        res.status(500).json({ error: 'Unable to fetch user payment information' });
    }
}

// Update payment information entry
async function updatePaymentInfo(req, res) {
    try {
        const paymentInfoId = req.params.paymentInfoId;
        const updateData = req.body;

        const updatedPaymentInfo = await PaymentInfo.findOneAndUpdate(
            { _id: paymentInfoId },
            updateData,
            { new: true }
        );

        if (!updatedPaymentInfo) {
            return res.status(404).json({ error: 'Payment information entry not found' });
        }

        res.json(updatedPaymentInfo);
    } catch (error) {
        console.error('Error updating payment information entry:', error);
        res.status(500).json({ error: 'Unable to update payment information entry' });
    }
}

// Delete payment information entry
async function deletePaymentInfoById(req, res) {
    const paymentInfoId = req.params.paymentInfoId;

    try {
        const deletedPaymentInfo = await PaymentInfo.findByIdAndRemove(paymentInfoId);

        if (!deletedPaymentInfo) {
            return res.status(404).json({ error: 'Payment information entry not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting payment information entry by ID:', error);
        res.status(500).json({ error: 'Unable to delete payment information entry' });
    }
}

module.exports = {
    createPaymentInfo, getPaymentInfoById, getPaymentInfoByUserId,updatePaymentInfo, deletePaymentInfoById,
};
