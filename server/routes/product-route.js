const router = require("express").Router();
const connection = require("../db");

router.get("/", (req, res) => {
    connection.execute(
        `SELECT
            p.product_id,
            p.product_name,
            p.vendor,
            p.category_id,
            p.subcategory_id,
            p.description,
            p.price,
            p.specialoffer,
            p.quantity,
            p.sales,
            p.created_at,
            p.images_one,
            p.images_two,
            p.images_three,
            p.images_four
        FROM
            products AS p
        JOIN
            subcategory AS s
        ON
            p.subcategory_id = s.subcategory_id`,
        (error, result) => {
            res.json({ result });
        }
    );
});


module.exports = router;
