
const router = require("express").Router();
const connection = require("../db");

// router.get("/user-coupon", (req, res) => {
  
// });
router.get("/user-coupon", (req,res)=>{
  //const currentId = req.decoded.user_id;
  connection.query(
    `SELECT *
    FROM users_coupon
    LEFT JOIN coupon ON users_coupon.coupon_id = coupon.coupon_id
    WHERE users_coupon.user_id = 1
    LIMIT 0, 100;`
  ,(err,results)=>{
    if(err){
      console.error('資料庫-查詢錯誤：', err);
      res.status(500).json({message: '資料庫查詢錯誤', code: '500'});
    }else{
      if(results.length>0){
        res.status(200).json({message:'success',code:'200',results:results})
      }
    }
  })
})

module.exports = router;
