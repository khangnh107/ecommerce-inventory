const express = require("express");
const router = express.Router();

// Import controllers
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController")
// const itemController = require("../controllers/itemController");

// Category Routes
// List all categories in database
router.get("/categories", categoryController.categoryList);

// Item Routes
// List all items in database
router.get("/items", itemController.itemList);

module.exports = router;