const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("product-route測試成功");
});
module.exports = router;