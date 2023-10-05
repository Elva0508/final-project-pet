// const router = require("express").Router();
// const connection=require("../db");

// router.get("/", (req, res) => {
//   res.send("user-route測試成功");
// });
// router.get("/data", (req,res)=>{
//     res.send("會員基本資料");
// })

// router.get("/user-coupon", (req, res) => {
//   connection.execute(
//     `SELECT md.*
//       FROM mission_detail AS md 
//       WHERE md.post_user_id = 1
//       ORDER BY md.post_date DESC;`,
//     (error, result) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: "資料庫查詢失敗" });
//       } else {
//         res.json({ result });
//       }
//     }
//   );
// });
// module.exports = router;
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
    UNION
    SELECT *
    FROM users_coupon
    RIGHT JOIN coupon ON users_coupon.coupon_id = coupon.coupon_id LIMIT 0,100;`
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
