const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

//Signup and Login routes
router.post("/user/create", userController.createUser);
router.get('/user/name/:first_name', userController.findUserByFirstName);
router.get('/user', userController.getAllUsers);
router.get('/user/id/:_id', userController.getUserById);
router.post('/user/login', userController.login);
router.put('user/update/:username',userController.updateUser);

//Forgot password routes
router.post("/user/forgot-password", userController.forgotPassword);
router.post("/user/reset-password", userController.resetPassword);

module.exports = router;
