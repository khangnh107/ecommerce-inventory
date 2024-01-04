const express = require("express");
const router = express.Router();

// Import controllers
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController")
// const itemController = require("../controllers/itemController");

// Category Routes
// List of all categories
router.get("/categories", categoryController.categoryList);
// Detail page of a category
router.get("/category/:id", categoryController.categoryDetail);

// Item Routes
// List of all items
router.get("/items", itemController.itemList);

module.exports = router;