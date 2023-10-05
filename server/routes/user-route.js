const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("user-route測試成功");
});
router.get("/data", (req,res)=>{
    res.send("會員基本資料");
})
module.exports = router;
