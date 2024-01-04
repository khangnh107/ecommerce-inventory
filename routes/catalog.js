const express = require("express");
const router = express.Router();

// Import controllers
const categoryController = require("../controllers/categoryController");
// const itemController = require("../controllers/itemController");

// Category routes
// List all categories in database
router.get("/category", categoryController.categoryList);

module.exports = router;