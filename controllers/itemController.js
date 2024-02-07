const asyncHandler = require('express-async-handler');
const { Client } = require('pg');
require('dotenv').config();

const connection_string = process.env.POSTGRES_CONNECTION_STRING;

exports.itemList = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const itemList = (await client.query("SELECT * FROM item")).rows;
  await client.end();

  res.render("item_list", {
    title: "List of All Items",
    itemList: itemList,
  });
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const item = (await client.query("SELECT item.name, item.description, item.price, category.name AS category_name, category.url AS category_url, item.quantity_in_stock, item.url FROM item INNER JOIN category ON item.category_id = category.id WHERE item.id = $1::bigint", [req.params.id])).rows[0];
  await client.end();

  res.render("item_detail", {
    item: item,
    categoryName: item.category_name,
    categoryUrl: item.categoryUrl,
  });
});

exports.getItemForm = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const categoryList = (await client.query("SELECT * FROM category")).rows;
  await client.end();
  
  res.render("item_form", {
    title: "Create Item",
    categoryList: categoryList,
  });
});

exports.postItemAdd = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const {itemName, itemDescription, itemCategoryId, itemPrice, itemQuantityInStock} = req.body;
  const itemUrl = (await client.query("INSERT INTO item (name, description, category_id, price, quantity_in_stock) VALUES ($1::text, $2::text, $3::bigint, $4::bigint, $5::int) RETURNING url", [itemName, itemDescription, itemCategoryId, itemPrice, itemQuantityInStock])).rows[0].url;
  await client.end();

  res.redirect(itemUrl);
});

exports.postItemDelete = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const itemId = req.params.id;
  await client.query("DELETE FROM item WHERE id = $1::bigint", [itemId]);
  await client.end();

  res.redirect("/catalog/items");
});

exports.getItemUpdateForm = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const itemId = req.params.id;
  const item = (await client.query("SELECT * FROM item WHERE id = $1::bigint", [itemId])).rows[0];
  const categoryList = (await client.query("SELECT * FROM category")).rows;
  await client.end();

  res.render("item_form", {
    title: "Update Item",
    item: item,
    categoryList: categoryList,
  })
});

exports.postItemUpdate = asyncHandler(async (req, res, next) => {
  const client = new Client(connection_string);

  await client.connect();
  const itemId = req.params.id;
  const {itemName, itemDescription, itemCategoryId, itemPrice, itemQuantityInStock} = req.body;
  const itemUrl = (await client.query("UPDATE item SET name = $1::text, description = $2::text, category_id = $3::bigint, price = $4::bigint, quantity_in_stock = $5::int WHERE id = $6::bigint RETURNING url", [itemName, itemDescription, itemCategoryId, itemPrice, itemQuantityInStock, itemId])).rows[0].url;
  await client.end();

  res.redirect(itemUrl);
});