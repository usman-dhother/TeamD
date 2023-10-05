const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post("/user/create", userController.createUser);
router.get('/user/name/:first_name', userController.findUserByFirstName);
router.get('/user', userController.getAllUsers);
router.get('/user/id/:_id', userController.getUserById);
router.post('/user/login', userController.login);

module.exports = router;
