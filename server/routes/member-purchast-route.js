const router = require("express").Router();
const connection=require("../db");

//拿取order中所有買過的商品
router.get("/", (req, res) => {
    connection.execute(
      `SELECT o.*,p.product_name AS product_name,pt.type_name AS type ,p.specialoffer AS price,p.images_one AS image,p.product_id AS product_id,pt.type_id AS type_id
      FROM orders AS o 
      JOIN order_details AS od ON o.oid=od.order_id
      JOIN products AS p ON p.product_id=od.product_id
      JOIN product_type AS pt ON pt.type_id=od.product_type AND pt.product_id=p.product_id
      WHERE o.user_id = 1`,
      (error, result) => {
        res.json({ result });
      }
    );
  });


//用來新增購物車裡沒有的商品
  router.put("/cart",(req,res)=>{
    const {id ,type}=req.body  
    connection.execute(
        `INSERT INTO cart(user_id, product_id,  product_type_id,quantity) VALUES (1,?,?,1);`,
        [id,type]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})

//用來修改購物車裡已經有的商品數量
router.put("/cartplus",(req,res)=>{
    console.log(req);
    const {id ,newQuantity,type}=req.body
    connection.execute(
        `UPDATE cart SET quantity=? WHERE user_id=1 AND product_id=? AND product_type_id=?`,
        [ newQuantity,id,type]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})

//先取得追蹤的商品有哪些
router.get("/wishlist", (req, res) => {
  connection.execute(
    `SELECT pc.*,p.product_id AS product_id
    FROM product_collections AS pc 
    JOIN products AS p ON pc.product_id = p.product_id 
    WHERE pc.user_id = 1;`,
    (error, result) => {
      res.json({ result });
    }
  );
});

//用來新增追蹤清單裡沒有的商品
router.put("/addwishlist",(req,res)=>{
  const {id}=req.body  
  connection.execute(
      `INSERT INTO product_collections (user_id, product_id,  product_type, status ) VALUES (1,?,1,1);`,
      [id]
      ,(error,result)=>{
          res.json({result})
      }    
  )
})

module.exports = router;