const router = require("express").Router();
const connection=require("../db");

//收藏清單
router.get("/", (req, res) => {
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
//刪除收藏清單
router.delete("/:id",(req,res)=>{
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
//收藏清單--想先知道購物車內有甚麼商品
router.get("/cart",(req,res)=>{
    connection.execute(
        `SELECT * FROM cart WHERE user_id=1;`
        ,(error,result)=>{
            res.json({result})
        }    
    )
})
  //用來新增購物車裡沒有的商品
  router.put("/cart/:id",(req,res)=>{
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
router.put("/cartplus",(req,res)=>{
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

module.exports = router;