const asyncHandler = require('express-async-handler');
const { Client } = require('pg');

exports.itemList = asyncHandler(async (req, res, next) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
  });

  await client.connect();
  const itemList = (await client.query("SELECT * FROM item")).rows;
  await client.end();

  res.render("item_list", {
    title: "List of All Items",
    itemList: itemList,
  });
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
  });

  await client.connect();
  const item = (await client.query("SELECT * FROM item WHERE id = $1::bigint", [req.params.id])).rows[0];
  await client.end();

  res.render("item_detail", {
    item: item,
  });
});

exports.getItemForm = asyncHandler(async (req, res, next) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
  });

  await client.connect();
  const categoryList = (await client.query("SELECT * FROM category")).rows;
  await client.end();
  
  res.render("item_form", {
    title: "Create Item",
    categoryList: categoryList,
  });
});

exports.postItemAdd = asyncHandler(async (req, res, next) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
  });

  await client.connect();
  const {itemName, itemDescription, itemCategory, itemPrice, itemQuantityInStock} = req.body;
  const itemUrl = (await client.query("INSERT INTO item (name, description, category_id, price, quantity_in_stock) VALUES ($1::text, $2::text, $3::bigint, $4::bigint, $5::int) RETURNING url", [itemName, itemDescription, itemCategory, itemPrice, itemQuantityInStock])).rows[0].url;
  await client.end();

  res.redirect(itemUrl);
});