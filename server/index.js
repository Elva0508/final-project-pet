const mysql = require("mysql2");
const connection = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const memberRouter = require("./routes/member-route");
const workRouter = require("./routes/work-route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/member", memberRouter);
app.use("/api/work", workRouter);

app.get("/member/order", (req, res) => {
  connection.execute(
    `WITH ranked_orders AS (
            SELECT
              o.*,
              d.product_id AS product_id,
              p.product_name AS product_name,
              p.specialoffer AS newprice,
              i.images_one AS image,
              ROW_NUMBER() OVER (PARTITION BY o.order_id ORDER BY o.order_id) AS row_num
            FROM
              orders AS o
              JOIN users AS u ON o.order_id = u.user_id
              JOIN order_details AS d ON o.order_id = d.order_id
              JOIN products AS p ON d.product_id = p.product_id
              JOIN images_product AS i ON p.product_group_id = i.id
            WHERE
              o.user_id = 1
          )
          SELECT *
          FROM ranked_orders
          WHERE row_num = 1;`,
    (error, result) => {
      res.json({ result });
    }
  );
});

app.get("/member/wishlist", (req, res) => {
  connection.execute(
    `SELECT pc.*, p.product_name AS product_name, p.product_type AS type,p.specialoffer AS price, i.images_one AS image 
        FROM product_collections AS pc 
        JOIN users AS u ON pc.user_id=u.user_id 
        JOIN products AS p ON pc.product_id = p.product_id 
        JOIN images_product AS i ON p.product_group_id = i.id 
        WHERE pc.user_id = 1;`,
    (error, result) => {
      res.json({ result });
    }
  );
});

app.get("/article", (req, res) => {
  connection.execute(
    `SELECT *
    FROM article
    JOIN article_category ON article.article_category_id = article_category.article_category_id
    JOIN article_images ON article.article_id = article_images.article_id;`,
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        res.json({ result });
      }
    }
  );
});

app.get("/article/category", (req, res) => {
  connection.execute(
    `SELECT *
    FROM article_category;`,
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        res.json({ result });
      }
    }
  );
});

app.get("/article/:cid/:id", (req, res) => {
  let id = req.params.id;
  connection.execute(
    `SELECT *
    FROM article
    JOIN article_category ON article.article_category_id = article_category.article_category_id
    JOIN article_images ON article.article_id = article_images.article_id
    WHERE article.article_id = ?`,
    [id], // 使用文章的 article_id 篩選特定文章
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        if (result.length > 0) {
          // 如果找到了文章，回傳
          res.json(result[0]);
        } else {
          // 如果未找到文章，回覆錯誤
          res.status(404).json({ error: "文章未找到" });
        }
      }
    }
  );
});

app.listen(3005, () => {
  console.log("server is running");
});
