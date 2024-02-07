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
    res.render("login-signup-form", {title: "Username already exists! Please use a different username to sign up!"});
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
  const user = await client.query("SELECT * FROM \"user\" WHERE usename = $1::text", [username]);
  await client.end();
});