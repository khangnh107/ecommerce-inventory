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
router.get("/category/create", categoryController.getCategoryAddForm);
// POST route to create new category
router.post("/category/create", categoryController.postCategoryAdd);
// Detail page of a category
router.get("/category/:id", categoryController.categoryDetail);
// POST route to delete category
router.post("/category/:id/delete", categoryController.postCategoryDelete);
// Page to update category
router.get("/category/:id/update", categoryController.getCategoryUpdateForm);
// POST route to update category
router.post("/category/:id/update", categoryController.postCategoryUpdate);

// Item Routes
// List of all items
router.get("/items", itemController.itemList);
// Page to create new item
router.get("/item/create", itemController.getItemForm);
// POST route to create new item
router.post("/item/create", itemController.postItemAdd);
// Detail page of an item
router.get("/item/:id", itemController.itemDetail);
// POST route to delete item
router.post("/item/:id/delete", itemController.postItemDelete);
// Page to update item
router.get("/item/:id/update", itemController.getItemUpdateForm);
// POST route to update item
router.post("/item/:id/update", itemController.postItemUpdate);

module.exports = router;