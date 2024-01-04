const asyncHandler = require('express-async-handler');

const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
});

exports.categoryList = asyncHandler(async (req, res, next) => {
    await client.connect();
    const data = await client.query("SELECT * FROM category")
    await client.end();
    res.render("category_list", {
        title: "List of All Categories",
        categoryList: data.rows
    });
});