var express = require('express');
var router = express.Router();

// Import controllers
const userController = require("../controllers/userController");

// Import JWT Verification
const {checkToken} = require("../controllers/checkToken");

/* GET home page. */
router.get('/', checkToken, function(req, res, next) {
  res.render('index', { title: 'Ecommerce Inventory Homepage' });
});

// GET sign-up page
router.get("/sign-up", userController.getSignUpPage);

// POST sign-up page
router.post("/sign-up", userController.postSignUpPage);

// GET login page
router.get("/login", userController.getLoginPage);

// POST login page
router.post("/login", userController.postLoginPage);

module.exports = router;
