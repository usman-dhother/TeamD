// Import required modules

const UserController = require('./controller/userController');

const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");




require('dotenv').config(); // Load environment variables from .env file

// Create an Express application
const app = express();
require("../server/routes")(app);
app.use(express.json());
app.use(cors());
// Define the MongoDB connection URI (replace with your actual MongoDB URI)
const mongoURI = 'mongodb+srv://tdiazpiedra:VdpKBsp6FQQkrNpv@fooddelivery.nyrstpp.mongodb.net/';

// Connect to MongoDB
mongoose.connect('mongodb+srv://tdiazpiedra:VdpKBsp6FQQkrNpv@fooddelivery.nyrstpp.mongodb.net/FoodDelivery', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log('Connected to MongoDB');
        const db = mongoose.connection.db;

        // List all collections in the database
        const collections = await db.listCollections().toArray();

        console.log('Collections in the database:');
        collections.forEach((collection) => {
            console.log(collection.name);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Start the Express server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });



// **ROUTES** //
// Define a route for testing
app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});







