const bcrypt = require('bcryptjs')
const User = require('../models/user'); // Adjust the path as needed
const emailService = require('../email');
const jwt = require('../auth');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash); // Compare password asynchronously
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error logging in:', error.message); // Log the error message
        res.status(500).json({ error: 'Unable to log in', message: error.message }); // Send the error message in the response (optional and only in development environment)
    }
}


// Create a new user
async function createUser(req, res) {
    try {
        const {
            // username,
            email,
            password: password_hash, // Make sure to hash the password before saving it
            firstName: first_name,
            lastName: last_name,
            // phone_number,
            // address,
            // payment_info_id,
            // user_type,
        } = req.body;
        const encrypt_pwd = await bcrypt.hash(password_hash, 10)
        // Create a new user document
        const newUser = new User({
            username: email,
            email,
            password_hash: encrypt_pwd, // Assuming you hash the password before saving
            first_name: first_name,
            last_name: last_name,
            // phone_number: phone_number,
            // address,
            // payment_info_id,
            user_type: 'user',
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

//Update User
async function updateUser(req, res) {
    try {
        const userId = req.params.username;
        const updateData = req.body; // Data to update

        // Use findOneAndUpdate to find and update the user by ID
        const updatedUser = await User.findOneAndUpdate(
            { username: userId },
            updateData,
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Unable to update user' });
    }

};

async function resetPassword(req, res) {
    const email = req.body.email;

    const user = User.findOne({email});

    if (!user) {
        res.status(403).send("User not found");
    }

    const token = jwt.generate(user);

    const message = `Click here to reset password: https://hunger-express.vercel.app/reset-password?token=${token}&email=${email}`;

    emailService.send(email, message);

    res.status(200).send('Email Sent Successfully!!');

}

async function changePassword(req, res) {
    const {password, email} = req.body;

    const encrypt_pwd = await bcrypt.hash(password, 10)

    if (req.body.existingPassword && req.body.username) {
        const {username, existingPassword} = req.body;

        const user = await User.findOne({ username }); // Find the user by email
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(existingPassword, user.password_hash); // Compare password asynchronously
        if (!isMatch) {
            return res.status(401).json({ error: 'Existing Password Doesnt match' });
        }

        await User.updateOne({username},{$set: {password_hash: encrypt_pwd}});
        res.status(200).send('Password Updated');
    } else {
        await User.updateOne({email},{$set: {password_hash: encrypt_pwd}});
        res.status(200).send('Password Updated');
    }

}


module.exports = {
    createUser, getUserById, getAllUsers, findUserByFirstName, login, updateUser, resetPassword, changePassword, 
};
