const express = require('express');
const UserController = require("./controller/userController");
const router = express.Router();
//const UserController = require('./controller/userController');


module.exports = app => {
    const bodyParser = require('body-parser');
    //app.use(express.json);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    const UserController = require('./controller/userController');



    //User Routes
    app.post("/user/create", UserController.createUser);
    app.get('/user/name/:first_name', UserController.findUserByFirstName);
    app.get('/user', UserController.getAllUsers);
    app.get('/user/id/:_id', UserController.getUserById);
    app.put('/user/update/:username',UserController.updateUser);




}
