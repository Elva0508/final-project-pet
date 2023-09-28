const router = require("express").Router();
const conn = require("../db");
router.get("/", (req, res) => {
  res.send("work-route測試成功");
});

router.get("/helpers", (req, res) => {
  // sql所有開啟小幫手功能的小幫手資料 & 依類型篩選小幫手資料

  const { type } = req.query;
  console.log(type);
  if (type === "all") {
    conn.execute(
      "SELECT h.*,u.cover_photo,r.review_count,r.average_star FROM `mission_helper_info` h LEFT JOIN `userinfo` u ON h.user_id = u.user_id LEFT JOIN (SELECT helper_id ,COUNT(*) AS review_count , SUM(star_rating) /  COUNT(*) AS average_star FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id WHERE `valid`=? LIMIT ?,?",
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
  } else if (type) {
    // 依類型篩選
    conn.execute(
      `SELECT * FROM mission_helper_info h LEFT JOIN userinfo u ON h.user_id = u.user_id LEFT JOIN (SELECT helper_id ,COUNT(*) AS review_count , SUM(star_rating) /  COUNT(*) AS average_star FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id WHERE ${type}_service=? AND valid=? LIMIT ?,?`,
      [true, 1, 0, 15],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        res.send({ status: 200, data: result });
      }
    );
  }
});

router.get("/helpers/famous", (req, res) => {
  const { type } = req.query;
  console.log(type);
  if (type === "all") {
    conn.execute(
      // 取得所有小幫手中，最多評論數量的排序，取前8筆
      // 思路：從review表開始join三張表，首先review表利用子查詢篩選出每個helper擁有的review數量高低的排序，再用這筆資料去join helper資料表的helper資料及userinfo資料表的cover_photo
      `SELECT h.*, u.cover_photo, r.review_count FROM (SELECT helper_id, COUNT(*) AS review_count  FROM mission_helper_reviews GROUP BY helper_id ORDER BY review_count DESC  LIMIT ?) r LEFT JOIN mission_helper_info h ON r.helper_id = h.user_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ?`,
      [8, 1],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.send({ status: 200, famous: result });
      }
    );
  } else {
    // 依類型篩選
    conn.execute(
      `SELECT h.*, u.cover_photo, r.review_count FROM mission_helper_info h LEFT JOIN (SELECT helper_id, COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? AND h.${type}_service = ? ORDER BY review_count DESC  LIMIT ?`,
      [1, true, 8],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.send({ status: 200, famous: result });
      }
    );
  }
});

router.get("/helpers/order", (req, res) => {
  // 排序小幫手資料
  const { filterType, orderType, orderWay } = req.query;
  const filters = `AND h.${filterType}_service = 1`;
  if (filterType === "all") {
    orders(res, filterType, orderType, orderWay);
    // res.send({ status: 200, data: result });
  } else {
    orders(res, filterType, orderType, orderWay, filters);
  }
});

module.exports = router;

function orders(res, filterType, orderType, orderWay, filters) {
  // 依服務價格排序
  if (orderType === "price") {
    conn.execute(
      `SELECT h.*,u.cover_photo FROM mission_helper_info h LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? ${filters} ORDER by h.${filterType}_price ${orderWay} LIMIT ?,?`,
      [1, 0, 15],
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(result);
        return res.send({ status: 200, data: result });
      }
    );
  } else if (orderType === "hot") {
    // 依熱門程度排序
    conn.execute(
      `SELECT h.*,u.cover_photo,r.review_count FROM mission_helper_info h LEFT JOIN (SELECT helper_id, COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r  ON h.user_id = r.helper_id  LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? ${filters} ORDER by r.review_count ${orderWay} LIMIT ?,?`,
      [1, 0, 15],
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(result);
        return res.send({ status: 200, data: result });
      }
    );
  } else if (orderType === "rating") {
    // 依評分數高低排序
    conn.execute(
      `SELECT DISTINCT h.*,u.cover_photo,r.average_star,r.review_count FROM mission_helper_info h LEFT JOIN (SELECT helper_id, SUM(star_rating) /  COUNT(*) AS average_star , COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id  LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? ${filters}  ORDER by r.average_star ${orderWay} LIMIT ?,?`,
      [1, 0, 15],
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(result);
        return res.send({ status: 200, data: result });
      }
    );
  }
}
