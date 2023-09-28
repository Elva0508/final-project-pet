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
          WHERE row_num = 1;`
        ,(error,result)=>{
        res.json({result})
        }
)})

app.post("/addMessage",(req,res)=>{
      
    connection.execute(
        `INSERT INTO product_reviews(user_id, product_id, review_content, star_rating, review_date) VALUES (1,,);`,
        [addId]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})

//用來新增購物車裡沒有的商品
app.put("/products/cart/:id",(req,res)=>{
    const addId=req.params.id   
    connection.execute(
        `INSERT INTO cart(user_id, product_id, quantity) VALUES (1,?,1);`,
        [addId]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})
//用來修改購物車裡已經有的商品數量
app.put("/products/cartplus",(req,res)=>{
    console.log(req);
    const {id ,newQuantity}=req.body
    connection.execute(
        `UPDATE cart SET quantity=? WHERE user_id=1 AND product_id=?`,
        [ newQuantity,id]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})

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

app.get("/cart",(req,res)=>{
    connection.execute(
        `SELECT * FROM cart WHERE user_id=1;`
        ,(error,result)=>{
            res.json({result})
        }    
    )
})

app.delete("/member/wishlist/:id",(req,res)=>{
    const deleteId=req.params.id
    connection.execute(
        `DELETE FROM product_collections WHERE product_collections.collection_id=?`,
        [deleteId]
        ,(error, result) => {
            if (error) {
              console.error("Error:", error);
              res.status(500).json({ error: "An error occurred" });
            } else {
              res.json({ result });
            }})
  
})

app.listen(3005,()=>{
    console.log("server is running");
})

