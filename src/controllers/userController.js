const User = require('../models/user');

exports.updateUserAllowNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // assuming you have middleware that attaches the user object to the request
    const { allowNotifications } = req.body;

    if (typeof allowNotifications !== 'boolean') {
      return res.status(400).send({ error: 'Invalid value for allowNotifications' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { allowNotifications } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send({ success: true, allowNotifications: user.allowNotifications });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const handleUpdateLocationAccess = async (req, res) => {
    const userId = req.user.id;
    const { locationAccess } = req.body;

    try {
        await userModel.updateUserLocationAccess(userId, locationAccess);
        res.status(200).send({ success: true, message: 'Location access updated successfully.' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error updating location access.' });
    }
};
