const express = require("express");
const router = express.Router();

// Import controllers
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController")
// const itemController = require("../controllers/itemController");

// Category Routes
// List of all categories
router.get("/categories", categoryController.categoryList);
// Page to create new category
router.get("/category/create", categoryController.getCategoryForm);
// POST route to create new category
router.post("/category/create", categoryController.postCategoryAdd);
// Detail page of a category
router.get("/category/:id", categoryController.categoryDetail);

// Item Routes
// List of all items
router.get("/items", itemController.itemList);
// Detail page of an item
router.get("/item/:id", itemController.itemDetail);

module.exports = router;