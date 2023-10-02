const mysql=require("mysql2");
const connection=require("./db");
const express=require("express");
const app=express();
const cors = require('cors');
const bodyParser=require('body-parser')

const memberRouter = require("./routes/member-route");
const workRouter = require("./routes/work-route");
const memberOrderRouter = require("./routes/member-order-route");
const memberWishlistRouter = require("./routes/member-wishlist-route");
const cartRouter = require("./routes/cart-route");

app.use(cors());
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/member", memberRouter);
app.use("/api/work", workRouter);
app.use("/api/member-order", memberOrderRouter);
app.use("/api/member-wishlist", memberWishlistRouter);
app.use("/api/product/cart", cartRouter);



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
app.listen(3005,()=>{
    console.log("server is running");
})
