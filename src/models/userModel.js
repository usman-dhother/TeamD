const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ... other fields
  allowNotifications: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const updateUserLocationAccess = async (userId, locationAccess) => {
    // This is a generic example; adjust based on your database and ORM/ODM
    const user = await User.findById(userId);
    user.locationAccess = locationAccess;
    return user.save();
};
