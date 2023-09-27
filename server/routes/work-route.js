const router = require("express").Router();
const conn = require("../db");
router.get("/", (req, res) => {
  res.send("work-route測試成功");
});

router.get("/helpers", (req, res) => {
  // sql所有開啟小幫手功能的小幫手資料
  //   conn.execute(
  //     "SELECT * FROM `mission_helper_info` WHERE `valid`=?",
  //     [1],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send({ status: 200, data: result });
  //     }
  //   );
  conn.execute(
    "SELECT * FROM `mission_helper_info` h LEFT JOIN `userinfo` u ON h.user_id = u.user_id WHERE `valid`=? LIMIT ?,?",
    [1, 0, 15],
    (err, result) => {
      // 一次只撈15筆資料
      if (err) {
        console.log(err);
        return;
      }
      res.send({ status: 200, data: result });
    }
  );
});
module.exports = router;
