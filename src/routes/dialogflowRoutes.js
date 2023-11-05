const express = require('express');
const router = express.Router();

router.post('/dialogflow-webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    switch(intentName) {
        case 'Change Order Address':
            // Logic to change order address
            res.json({
                "fulfillmentText": "Your order address has been updated."
            });
            break;
        // Handle other intents similarly
        default:
            res.json({
                "fulfillmentText": "Sorry, I couldn't understand that."
            });
    }
});

module.exports = router;
