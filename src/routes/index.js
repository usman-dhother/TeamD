const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');
const RestaurantCategoryController = require('../controllers/restaurantCategoryController');
const MenuItemsController = require('../controllers/menuItemsController');


const userRoutes = require('./user');

router.post("/restaurant/create",RestaurantController.createRestaurant);
router.get('/restaurant/:restaurantId',RestaurantController.getRestaurantById);
router.get('/restaurant/',RestaurantController.getAllRestaurants);
router.put('/restaurant/update/:restaurantId',RestaurantController.updateRestaurant);
router.delete('/restaurant/delete/:restaurantId',RestaurantController.deleteRestaurantById);

//Restaurant Category Routes
router.post("/restaurantCategory/create",RestaurantCategoryController.createRestaurantCategory);
router.get("/restaurantCategory/",RestaurantCategoryController.getAllRestaurantCategories);
router.get("/restaurantCategory/:categoryId",RestaurantCategoryController.getRestaurantCategoryById);
router.put("/restaurantCategory/update/:categoryId",RestaurantCategoryController.updateRestaurantCategory);
router.delete("/restaurantCategory/delete/:categoryId",RestaurantCategoryController.deleteRestaurantCategoryById);

//Menu Items Routes
router.post("/menuItems/create",MenuItemsController.createMenuItem);
router.get('/menuItems/menu/:menuItemId',MenuItemsController.getMenuItemById);

//Input the restaurant Id to get all menu items from that specific restaurant
router.get('/menuItems/restaurant/:restaurantId',MenuItemsController.getAllMenuItemsForRestaurant);

router.put('/menuItems/update/:menuItemId',MenuItemsController.updateMenuItem);
router.delete('/menuItems/delete/:menuItemId',MenuItemsController.deleteMenuItemById);

// Mount the individual routers
router.use('/', userRoutes);

module.exports = router;
