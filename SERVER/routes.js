const express = require('express');
const UserController = require("./controller/userController");
const RestaurantController = require("./controller/restaurantController");
const router = express.Router();
//const UserController = require('./controller/userController');


module.exports = app => {
    const bodyParser = require('body-parser');
    //app.use(express.json);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    const UserController = require('./controller/userController');
    const RestaurantController = require('./controller/restaurantController');
    const RestaurantCategoryController = require('./controller/restaurantCategoryController');
    const MenuItemsController = require('./controller/menuItemsController');



    //User Routes
    app.post("/user/create", UserController.createUser);
    app.get('/user/name/:first_name', UserController.findUserByFirstName);
    app.get('/user', UserController.getAllUsers);
    app.get('/user/id/:_id', UserController.getUserById);

    //Restaurant Routes
    app.post("/restaurant/create",RestaurantController.createRestaurant);
    app.get('/restaurant/:restaurantId',RestaurantController.getRestaurantById);
    app.get('/restaurant/',RestaurantController.getAllRestaurants);
    app.put('/restaurant/update/:restaurantId',RestaurantController.updateRestaurant);
    app.delete('/restaurant/delete/:restaurantId',RestaurantController.deleteRestaurantById);

    //Restaurant Category Routes
    app.post("/restaurantCategory/create",RestaurantCategoryController.createRestaurantCategory);
    app.get("/restaurantCategory/",RestaurantCategoryController.getAllRestaurantCategories);
    app.get("/restaurantCategory/:categoryId",RestaurantCategoryController.getRestaurantCategoryById);
    app.put("/restaurantCategory/update/:categoryId",RestaurantCategoryController.updateRestaurantCategory);
    app.delete("/restaurantCategory/delete/:categoryId",RestaurantCategoryController.deleteRestaurantCategoryById);

    //Menu Items Routes
    app.post("/menuItems/create",MenuItemsController.createMenuItem);
    app.get('/menuItems/menu/:menuItemId',MenuItemsController.getMenuItemById);

    //Input the restaurant Id to get all menu items from that specific restaurant
    app.get('/menuItems/restaurant/:restaurantId',MenuItemsController.getAllMenuItemsForRestaurant);

    app.put('/menuItems/update/:menuItemId',MenuItemsController.updateMenuItem);
    app.delete('/menuItems/delete/:menuItemId',MenuItemsController.deleteMenuItemById);





}
