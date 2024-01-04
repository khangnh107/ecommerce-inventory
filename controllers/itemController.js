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