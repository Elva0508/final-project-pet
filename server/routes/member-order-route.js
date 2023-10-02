const router = require("express").Router();
const connection=require("../db");


//拿出我的訂單紀錄(僅顯示第一項商品資訊)
router.get("/", (req, res) => {
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
  
  //拿訂單細節資料
  router.get("/order-detail",(req,res)=>{     
      connection.execute(
          `SELECT o.* FROM orders AS o WHERE o.oid=1`,
          (error,result)=>{
              res.json({result})
          }    
      )
  })
  
  
  //商品評論
  router.post("/addMessage",(req,res)=>{
        
      connection.execute(
          `INSERT INTO product_reviews(user_id, product_id, review_content, star_rating, review_date) VALUES (1,,);`,
          [addId]
          ,(error,result)=>{
              res.json({result})
          }    
      )
  })

  module.exports = router;