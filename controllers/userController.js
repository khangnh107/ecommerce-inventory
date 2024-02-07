const asyncHandler = require('express-async-handler');
const { Client } = require('pg');
require('dotenv').config();

const connection_string = process.env.POSTGRES_CONNECTION_STRING;

exports.getSignUpPage = asyncHandler(async (req, res, next) => {
  res.render("login-signup-form", {title: "Sign-Up Page"});
});

exports.postSignUpPage = asyncHandler(async (req, res, next) => {
  req.end("Signed up");
});

exports.getLoginPage = asyncHandler(async (req, res, next) => {
  res.render("login-signup-form", {title: "Login Page"});
});

exports.postLoginPage = asyncHandler(async (req, res, next) => {
  req.end("Logged in");
});