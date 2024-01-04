const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
});

exports.itemList = async (req, res, next) => {
  await client.connect();
  const data = await client.query("SELECT * FROM item")
  await client.end();
  console.log(data.rows);
  res.render("item_list", {
    title: "List of All Items",
    itemList: data.rows,
  });
}