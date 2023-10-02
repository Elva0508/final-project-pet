const router = require("express").Router();
const connection=require("../db");

  //拿訂單細節資料
  router.get("/:oid",(req,res)=>{
    const orderId =req.params.oid
    connection.execute(
        `SELECT o.*, 
        p.images_one AS image, 
        os.status_name AS status_name, 
        op.payment AS payment, 
        oship.shipment AS shipment,
        p.product_name AS product_name,
        od.quantity AS quantity,
        p.specialoffer AS price,
        pt.type_name AS type            
 FROM orders AS o 
 JOIN users AS u ON o.user_id = u.user_id 
 JOIN order_details AS od ON o.oid=od.order_id
 JOIN products AS p ON od.product_id = p.product_id   
 JOIN order_status AS os ON o.status_id = os.status_id 
 JOIN order_payment AS op ON o.order_payment = op.id 
 JOIN order_shipment AS oship ON o.order_shipment = oship.id
 JOIN product_type AS pt ON p.product_id=pt.product_id
 WHERE o.user_id = 1 AND od.order_id=?;`,
        [orderId],
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