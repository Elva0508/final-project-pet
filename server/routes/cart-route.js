const router = require("express").Router();
const connection=require("../db");

router.get("/",(req,res)=>{    
    connection.execute(
        `SELECT c.*,p.product_name AS product_name,p.price AS price,p.specialoffer AS newprice,p.images_one AS images,t.type_name AS type
        FROM cart AS c 
        JOIN products AS p ON c.product_id = p.product_id 
        JOIN product_type AS t ON c.product_id = t.product_id AND t.type_id=c.product_type_id
        WHERE c.user_id=1  `
        ,(error,result)=>{
        res.json({result})
        }
)})

router.get("/coupon",(req,res)=>{
  console.log(req);
  const allPrice= req.query.allPrice; 
    connection.execute(
        `
        SELECT u.*,c.title AS title,c.discount_type AS type,c.usage_min AS min,c.discount_amount AS amount,c.discount AS discount 
        FROM users_coupon AS u 
        JOIN coupon AS c on c.coupon_id=u.coupon_id
        WHERE u.valid=1 AND u.user_id=1 AND c.usage_min < ?`
        ,[allPrice]
        ,(error,result)=>{
        res.json({result})
        }
)})

router.put("/",(req,res)=>{
  // console.log(req.query);
    const { id,newquantity } = req.body; 
    connection.execute(
        `UPDATE cart AS c SET c.quantity=? WHERE c.cart_id=?`,
        [newquantity ,id]
        ,(error, result) => {
            if (error) {
              console.error("Error:", error);
              res.status(500).json({ error: "An error occurred" });
            } else {
              res.json({ result });
            }})
})

router.delete("/:id",(req,res)=>{
    const cartIdToDelete = req.params.id;
    connection.execute(
        `DELETE FROM cart WHERE cart.cart_id=?`,
        [cartIdToDelete]
        ,(error, result) => {
            if (error) {
              console.error("Error:", error);
              res.status(500).json({ error: "An error occurred" });
            } else {
              res.json({ result });
            }})
  
})
module.exports = router;