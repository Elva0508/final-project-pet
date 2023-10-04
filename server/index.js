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

//------------------------------------------佳瑜
// //jwt路由使用
const authJWTRouter = require("./routes/auth-jwt-other");

// // // 掛載 auth-jwt 路由
app.use('/api/auth-jwt', authJWTRouter);

//跨網域資源共用、設置白名單
app.use(
  cors({
    origin: [ "http://127.0.0.1:3005",
    "http://localhost:3005",
    "http://127.0.0.1:3000",
    "http://localhost:3000",],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)


app.get("/login", (req,res)=>{
  res.send("登入頁面測試")
})





app.listen(3005, () => {
  console.log("server is running");
});
