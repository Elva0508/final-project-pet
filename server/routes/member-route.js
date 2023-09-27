const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("member-route測試成功");
});
module.exports = router;
