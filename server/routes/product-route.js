const router = require("express").Router();
const connection = require("../db");

router.get("/", (req, res) => {
    connection.execute(
        `SELECT
        p.*
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
