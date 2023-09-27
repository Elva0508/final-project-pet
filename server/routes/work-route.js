const router = require("express").Router();
const conn = require("../db");
router.get("/", (req, res) => {
  res.send("work-route測試成功");
});

router.get("/helpers", (req, res) => {
  // sql所有開啟小幫手功能的小幫手資料;
  // conn.execute(
  //   "SELECT * FROM `mission_helper_info` WHERE `valid`=?",
  //   [1],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send({ status: 200, data: result });
  //   }
  // );
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

router.get("/helpers/famous", (req, res) => {
  conn.execute(
    // 取得所有小幫手中，最多評論數量的排序，取前8筆
    // 思路：從review表開始join三張表，首先review表利用子查詢篩選出每個helper擁有的review數量高低的排序，再用這筆資料去join helper資料表的helper資料及userinfo資料表的cover_photo
    "SELECT h.*, u.cover_photo, r.review_count FROM (SELECT helper_id, COUNT(*) AS review_count  FROM `mission_helper_reviews` GROUP BY helper_id ORDER BY review_count DESC  LIMIT ?) r LEFT JOIN `mission_helper_info` h ON r.helper_id = h.user_id LEFT JOIN `userinfo` u ON h.user_id = u.user_id WHERE h.`valid` = ?",
    [8, 1],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.send({ status: 200, famous: result });
    }
  );
});

module.exports = router;
