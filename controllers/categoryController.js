const asyncHandler = require('express-async-handler');
const { Client } = require('pg');

exports.categoryList = asyncHandler(async (req, res, next) => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'ecommerce_inventory',
        user: 'nhk',
    });

    await client.connect();
    const category_list = (await client.query("SELECT * FROM category")).rows;
    await client.end();

    console.log(category_list);

    res.render("category_list", {
        title: "List of All Categories",
        categoryList: category_list
    });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'ecommerce_inventory',
        user: 'nhk',
    });

    await client.connect();
    const category = (await client.query("SELECT * FROM category WHERE id=$1::bigint", [req.params.id])).rows[0];
    const itemsInCategory = (await client.query("SELECT item.id, item.name, item.price, item.quantity_in_stock, item.url FROM item INNER JOIN category ON item.category_id = category.id AND category.id = $1::bigint", [category.id])).rows;
    await client.end();

    res.render("category_detail", {
        title: category.name,
        description: category.description,
        itemsInCategory: itemsInCategory,
    });
});