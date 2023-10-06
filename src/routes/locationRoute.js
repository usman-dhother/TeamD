const express = require('express');
const locationController = require('./locationController');

const router = express.Router();

// Define your location-related routes here
// For example:
router.get('/some-endpoint', locationController.someFunction);

module.exports = router;
