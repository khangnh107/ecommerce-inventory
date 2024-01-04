const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_inventory',
    user: 'nhk',
});

exports.categoryList = async (req, res, next) => {
    await client.connect();
    const data = await client.query("SELECT * FROM category")
    await client.end();
    console.log(data.rows)
    res.send();
};