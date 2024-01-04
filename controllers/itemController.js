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

  console.log(item);
  res.render("item_detail", {
    item: item,
  });
});