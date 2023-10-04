const User = require('../models/userModel'); // Adjust the path as needed

// Create a new user
async function createUser(req, res) {
    try {
        const {
            username,
            email,
            password_hash, // Make sure to hash the password before saving it
            first_name,
            last_name,
            phone_number,
            address,
            payment_info_id,
            user_type,
        } = req.body;

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password_hash: password_hash, // Assuming you hash the password before saving
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            address,
            payment_info_id,
            user_type: user_type,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        //console.log(req.body);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Unable to create user' });
    }
}

// Read a user by ID
async function getUserById(req, res) {
    const id = req.params._id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Unable to fetch user' });
    }
}
// Find all users
async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    }
}

const findUserByFirstName = async (req, res) => {
    try {
        const first_name = req.params.first_name; // Get the first name from request parameters

        // Use Mongoose to find users with the specified first name
        const users = await User.find({ first_name });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with the specified first name.' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error finding users by first name:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
module.exports = {
    createUser, getUserById, getAllUsers, findUserByFirstName
};
