const asyncHandler = require('express-async-handler');
const { Client } = require('pg');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const connection_string = process.env.POSTGRES_CONNECTION_STRING;

exports.getSignUpPage = asyncHandler(async (req, res, next) => {
  res.render("login-signup-form", {title: "Sign-Up Page"});
});

exports.postSignUpPage = asyncHandler(async (req, res, next) => {
  const {username, password} = req.body;

  const client = new Client(connection_string);
  await client.connect();
  const existingUsername = (await client.query("SELECT * FROM \"user\" WHERE username = $1::text", [username])).rows;
  if (existingUsername.length > 0) {
    res.render("login-signup-form", {title: "Username already exists! Please sign up again."});
  } else {
    await client.query("INSERT INTO \"user\" (username, password) VALUES ($1::text, $2::text)", [username, password]);
    res.redirect("/");
  }
  await client.end();
});

exports.getLoginPage = asyncHandler(async (req, res, next) => {
  res.render("login-signup-form", {title: "Login Page"});
});

exports.postLoginPage = asyncHandler(async (req, res, next) => {
  const {username, password} = req.body;

  const client = new Client(connection_string);
  await client.connect();
  let existingUser = (await client.query("SELECT * FROM \"user\" WHERE username = $1::text", [username])).rows;
  if (existingUser.length == 0) {
    res.render("login-signup-form", {title: "Incorrect username! Please Log In Again."});
  } else {
    existingUser = existingUser[0];
    if (password === existingUser.password) {
      jwt.sign({existingUser}, process.env.JWT_SECRET, {expiresIn: "1h"}, (err, token) => {
        if (err) {console.log(err)}
        res
          .cookie('access_token', 'Bearer ' + token, {
            expires: new Date(Date.now() + 3600000) // cookie will be removed after 1 hours
          })
          .render("index", {title: "Logged in successfully! Welcome to Ecommerce Inventory."});
      });
    } else {
      res.render("login-signup-form", {title: "Incorrect password! Please Log In Again."});
    }
  }
  await client.end();
});