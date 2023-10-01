const router = require("express").Router();
const conn = require("../db");
router.get("/", (req, res) => {
  res.send("member-route測試成功");
});

router.get("/helper-info", (req, res) => {
  const { user_id } = req.query;
  console.log(req.query);
  conn.execute(
    `SELECT * FROM mission_helper_info WHERE user_id = ? AND valid = ?`,
    [user_id, 1],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ status: 500, data: "伺服器查詢失敗" });
      }
      return res.send({ status: 200, data: results });
    }
  );
});

module.exports = router;
