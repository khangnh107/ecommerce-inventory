const asyncHandler = require('express-async-handler');
const { Client } = require('pg');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const connection_string = process.env.POSTGRES_CONNECTION_STRING;

exports.categoryList = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      const user = authorizedData.existingUser;
      
      const client = new Client(connection_string);

      await client.connect();
      const categoryList = (await client.query("SELECT * FROM category WHERE user_id = $1::bigint", [user.id])).rows;
      await client.end();

      res.render("category_list", {
          title: "List of All Categories",
          categoryList: categoryList
      });
    }
  });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      const user = authorizedData.existingUser;

      const client = new Client(connection_string);

      await client.connect();
      const category = (await client.query("SELECT * FROM category WHERE id=$1::bigint AND user_id = $2::bigint", [req.params.id, user.id])).rows[0];
      const itemsInCategory = (await client.query("SELECT item.id, item.name, item.price, item.quantity_in_stock, item.url FROM item INNER JOIN category ON item.category_id = category.id AND category.id = $1::bigint AND category.user_id = $2::bigint", [category.id, user.id])).rows;
      await client.end();

      res.render("category_detail", {
          title: category.name,
          category: category,
          itemsInCategory: itemsInCategory,
      });
    }
  });
});

exports.getCategoryAddForm = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      res.render("category_form", {title: "Create Category"});
    }
  });
});

exports.postCategoryAdd = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      res.json({
        message: 'Successful Log In!',
        authorizedData,
      });
      console.log('SUCCESS: Connected to protected route');
    }
  });

  const client = new Client(connection_string);

  await client.connect();
  const {categoryName, categoryDescription} = req.body;
  const categoryUrl = (await client.query("INSERT INTO category (name, description) VALUES ($1::text, $2::text) RETURNING url", [categoryName, categoryDescription])).rows[0].url;
  await client.end();

  res.redirect(categoryUrl);
});

exports.postCategoryDelete = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      res.json({
        message: 'Successful Log In!',
        authorizedData,
      });
      console.log('SUCCESS: Connected to protected route');
    }
  });

  const client = new Client(connection_string);

  await client.connect();
  const category = (await client.query("SELECT * FROM category WHERE id=$1::bigint", [req.params.id])).rows[0];
  const itemsInCategory = (await client.query("SELECT item.id, item.name, item.price, item.quantity_in_stock, item.url FROM item INNER JOIN category ON item.category_id = category.id AND category.id = $1::bigint", [category.id])).rows;
  if (itemsInCategory.length) {
      res.render("category_delete_fail", {
          title: "Delete Category: " + category.name,
          category: category.name,
          itemList: itemsInCategory,
      });
  } else {
      await client.query("DELETE FROM category WHERE id = $1::bigint", [category.id]);
      res.redirect("/catalog/categories");
  }
  await client.end();
});

exports.getCategoryUpdateForm = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      res.json({
        message: 'Successful Log In!',
        authorizedData,
      });
      console.log('SUCCESS: Connected to protected route');
    }
  });
  
  const client = new Client(connection_string);

  await client.connect();
  const category = (await client.query("SELECT * FROM category WHERE id = $1::bigint", [req.params.id])).rows[0];
  await client.end();

  res.render("category_form", {
      title: "Update Category",
      category: category,
  });
});

exports.postCategoryUpdate = asyncHandler(async (req, res, next) => {
  // Verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data 
      res.json({
        message: 'Successful Log In!',
        authorizedData,
      });
      console.log('SUCCESS: Connected to protected route');
    }
  });

  const client = new Client(connection_string);

  await client.connect();
  const {categoryName, categoryDescription} = req.body;
  const categoryUrl = (await client.query("UPDATE category SET name = $1::text, description = $2::text WHERE id = $3::bigint RETURNING url", [categoryName, categoryDescription, req.params.id])).rows[0].url;
  await client.end();

  res.redirect(categoryUrl);
});