const express = require("express");
const router = express.Router();

// Import controllers
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController")

// Import JWT Verification
const {checkToken} = require("../controllers/checkToken");

// Category Routes
// List of all categories
router.get("/category", checkToken, categoryController.categoryList);
// Page to create new category
router.get("/category/create", checkToken, categoryController.getCategoryAddForm);
// POST route to create new category
router.post("/category/create", checkToken, categoryController.postCategoryAdd);
// Detail page of a category
router.get("/category/:id", checkToken, categoryController.categoryDetail);
// POST route to delete category
router.post("/category/:id/delete", checkToken, categoryController.postCategoryDelete);
// Page to update category
router.get("/category/:id/update", checkToken, categoryController.getCategoryUpdateForm);
// POST route to update category
router.post("/category/:id/update", checkToken, categoryController.postCategoryUpdate);

// Item Routes
// List of all items
router.get("/item", checkToken, itemController.itemList);
// Page to create new item
router.get("/item/create", checkToken, itemController.getItemForm);
// POST route to create new item
router.post("/item/create", checkToken, itemController.postItemAdd);
// Detail page of an item
router.get("/item/:id", checkToken, itemController.itemDetail);
// POST route to delete item
router.post("/item/:id/delete", checkToken, itemController.postItemDelete);
// Page to update item
router.get("/item/:id/update", checkToken, itemController.getItemUpdateForm);
// POST route to update item
router.post("/item/:id/update", checkToken, itemController.postItemUpdate);

module.exports = router;