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




//category/subcategory類別
router.get("/category", (req, res) => {
  connection.execute(
    `SELECT
        category.category_id,
        category.category_name,
        GROUP_CONCAT(subcategory.subcategory_name) as subcategories
        FROM category
        JOIN subcategory ON subcategory.category_id = category.category_id
        GROUP BY category.category_name
        ORDER BY category.category_id; `,
    (error, result) => {
      res.json({ result });
    }
  );
});

//商品細節頁
router.get("/product-detail/:product_id", (req, res) => {
  const productId = req.params.product_id; // 取得從路由參數中傳入的 product_id
  connection.execute(
    `SELECT
        products.*,
        category.category_name AS category_name,
        subcategory.subcategory_name AS subcategory_name,
        GROUP_CONCAT(product_type.type_name) AS type_names
        FROM products
        JOIN category ON category.category_id = products.category_id
        JOIN subcategory ON subcategory.subcategory_id = products.subcategory_id
        LEFT JOIN product_type ON product_type.product_id = products.product_id
        WHERE products.product_id = ?
        GROUP BY products.product_id`,
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

//首頁用product產品資料-最新商品
router.get("/home", (req, res) => {
  connection.execute(
    `SELECT
        products.*,
        category.category_name AS category_name,
        subcategory.subcategory_name AS subcategory_name
        FROM products
        JOIN category ON category.category_id = products.category_id
        JOIN subcategory ON subcategory.subcategory_id = products.subcategory_id
        ORDER BY created_at DESC
        LIMIT 8`,

    (error, result) => {
      res.json({ result });
    }
  );
});

//首頁用product產品資料-熱銷商品
router.get("/home/sales", (req, res) => {
  connection.execute(
    `SELECT *
      FROM products
      ORDER BY sales DESC
      LIMIT 8;`,

    (error, result) => {
      res.json({ result });
    }
  );
});

module.exports = router;
