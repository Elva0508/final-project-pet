const router = require("express").Router();
const connection = require("../db");

//product產品資料
router.get("/", (req, res) => {
    connection.execute(
        `SELECT
        products.*,
        category.category_name AS category_name,
        subcategory.subcategory_name AS subcategory_name
        FROM products
        JOIN category ON category.category_id = products.category_id
        JOIN subcategory ON subcategory.subcategory_id = products.subcategory_id`,

        (error, result) => {
            res.json({ result });
        }
    );
});

//category類別
router.get("/category", (req, res) => {
    connection.execute(
        `SELECT
       category_name FROM category`,

        (error, result) => {
            res.json({ result });
        }
    );
});

//subcategory類別
router.get("/category/subcategory", (req, res) => {
    connection.execute(
        `SELECT
        subcategory.subcategory_name as subcategory,
        category.category_name AS category_name
        FROM subcategory
        JOIN category ON category.category_id = subcategory.category_id
        `,

        (error, result) => {
            res.json({ result });
        }
    );
});

router.get("/product-detail/:product_id", (req, res) => {
    const productId = req.params.product_id; // 取得從路由參數中傳入的 product_id
    connection.execute(
        `SELECT
        products.*,
        category.category_name AS category_name,
        subcategory.subcategory_name AS subcategory_name
        FROM products
        JOIN category ON category.category_id = products.category_id
        JOIN subcategory ON subcategory.subcategory_id = products.subcategory_id
        WHERE products.product_id = ?`,
        [productId],
        (error, result) => {
            if (error) {
                console.error("Database error:", error);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ result });
            }
        }
    );
});






module.exports = router;
