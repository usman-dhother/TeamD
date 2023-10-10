const express = require('express');
const userController = require('../controllers/user');
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/user/create", userController.createUser);
router.get('/user/name/:first_name', userController.findUserByFirstName);
router.get('/user', userController.getAllUsers);
router.get('/user/id/:_id', userController.getUserById);
router.post('/user/login', userController.login);
router.put('/user/update/:username',userController.updateUser);
router.post('/user/reset-password', userController.resetPassword);
router.post('/user/change-password', auth.isValid, userController.changePassword);

//TODO thomas - add the location and notification for user table
// router.put('/user/locationAccess',userController.updateUserLocationAccess);
// router.put('/user/allowNotifications', userController.updateUserAllowNotifications);
// router.get('/user/locationAccess/:_id', userController.getLocationAccess);
// router.get('/user/allowNotifications/:_id', userController.getAllowNotification);

module.exports = router;
