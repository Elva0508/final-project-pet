const router = require("express").Router();
const conn = require("../db");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/mission-image")); // 設置上傳文件的儲存路徑
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // 設置上船文件的文件名
  },
});

const upload = multer({ storage: storage });

router.get("/helpers/famous", (req, res) => {
  const { type } = req.query;
  console.log(type);
  if (type === "all") {
    conn.execute(
      // 取得所有小幫手中，依評論數量高到低的排序，並篩選平均星數高於4.5以上的小幫手，作為熱門小幫手，取前8筆
      // 思路：從review表開始join三張表，首先review表利用子查詢篩選出每個helper擁有的review數量高低的排序，再用這筆資料去join helper資料表的helper資料及userinfo資料表的cover_photo
      `SELECT h.*, u.cover_photo, r.review_count,r.average_star FROM mission_helper_info h LEFT JOIN(SELECT helper_id, SUM(star_rating) /  COUNT(*) AS average_star , COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? AND r.average_star > 4.5 ORDER BY review_count DESC  LIMIT ?`,
      [1, 8],
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
      `SELECT h.*, u.cover_photo, r.review_count,r.average_star FROM mission_helper_info h LEFT JOIN(SELECT helper_id, SUM(star_rating) /  COUNT(*) AS average_star , COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? AND h.${type}_service = ? AND r.average_star > 4.5 ORDER BY review_count DESC  LIMIT ?`,
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
    orders(res, "feed", orderType, orderWay, "");
    // res.send({ status: 200, data: result });
  } else {
    orders(res, filterType, orderType, orderWay, filters);
  }
});

router.get("/helpers/search", (req, res) => {
  const { search } = req.query;
  conn.execute(
    `SELECT h.*, u.cover_photo, r.review_count, r.average_star
    FROM mission_helper_info h
    LEFT JOIN (
      SELECT helper_id, SUM(star_rating) / COUNT(*) AS average_star, COUNT(*) AS review_count
      FROM mission_helper_reviews
      GROUP BY helper_id
    ) r ON h.user_id = r.helper_id
    LEFT JOIN userinfo u ON h.user_id = u.user_id
    WHERE h.valid = ? AND (h.name LIKE ? OR h.email LIKE ? OR h.phone LIKE ?)
    LIMIT ?, ?`,
    [1, `%${search}%`, `%${search}%`, `%${search}%`, 0, 8],
    (err, result) => {
      if (err) {
        console.log(err);
        return false;
      }

      return res.send({ status: 200, data: result });
    }
  );
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

router.get("/helpers/detail/:uid", async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  const profilePromise = new Promise((resolve, reject) => {
    conn.execute(
      `SELECT  h.*, r.review_count, r.average_star,u.cover_photo FROM mission_helper_info h LEFT JOIN (SELECT helper_id, COUNT(*) AS review_count, SUM(star_rating) / COUNT(*) AS average_star FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.user_id = ?`,
      [uid],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
  const reviewsPromise = new Promise((resolve, reject) => {
    conn.execute(
      `SELECT r.*,u.cover_photo,u.name FROM mission_helper_reviews r LEFT JOIN userinfo u ON r.user_id = u.user_id WHERE r.helper_id = ?`,
      [uid],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
  const imagesPromise = new Promise((resolve, reject) => {
    conn.execute(
      `SELECT file_path FROM image_helper WHERE group_id = ?`,
      [uid],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
  try {
    // 使用 Promise.all 等待所有查詢完成
    let [profile, reviews, images] = await Promise.all([
      profilePromise,
      reviewsPromise,
      imagesPromise,
    ]);
    // 在後端轉換review的日期格式
    reviews = reviews.map((review) => {
      const newDate = transferDate(review.review_date);
      console.log(newDate);
      return { ...review, review_date: newDate };
    });
    // 成功執行 res.send
    res.send({ status: 200, data: { profile, reviews, images } });
  } catch (err) {
    // reject則捕捉錯誤
    console.log(err);
    res.status(500).send({ status: 500, error: "伺服器端查詢錯誤" });
  }
});

router.post("/mission", upload.array("missionImage"), async (req, res) => {
  // const { formData } = req.body;
  const {
    title,
    location_detail,
    mission_type,
    description,
    price,
    payment,
    startDay,
    endDay,
    city,
    area,
  } = req.body;
  const taskId = uuidv4();
  console.log(req.files);
  conn.execute(
    "INSERT INTO `mission_detail` (`mission_id`, `pid`, `title`, `price`, `start_date`, `end_date`, `city`, `area`, `location_detail`, `description`, `mission_type`, `payment_type`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)",
    [
      taskId,
      title,
      price,
      startDay,
      endDay,
      city,
      area,
      location_detail,
      description,
      mission_type,
      payment,
    ],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ status: 500, error: "寫入錯誤" });
      }
      try {
        const insertId = results.insertId;
        await req.files.map((file) => {
          conn.execute(
            "INSERT INTO `image_mission` (`image_id`, `mission_id`, `file_path`) VALUES (NULL, ?, ?)",
            [insertId, file.filename]
          );
        });
        const mission_detail_promise = new Promise((resolve, reject) => {
          return conn.execute(
            `SELECT * FROM mission_detail WHERE mission_id = ?`,
            [insertId],
            (err, results) => {
              if (err) {
                reject(
                  res.status(500).send({ status: 500, error: "查詢錯誤" })
                );
              }
              resolve(results);
            }
          );
        });
        const mission_image_promise = new Promise((resolve, reject) => {
          return conn.execute(
            `SELECT file_path FROM image_mission WHERE mission_id = ?`,
            [insertId],
            (err, results) => {
              if (err) {
                reject(
                  res.status(500).send({ status: 500, error: "查詢錯誤" })
                );
              }
              resolve(results);
            }
          );
        });
        let [detail, image] = await Promise.all([
          mission_detail_promise,
          mission_image_promise,
        ]);
        res.send({ status: 200, detail, image });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, error: "寫入錯誤" });
      }
    }
  );
});
module.exports = router;

function orders(res, filterType, orderType, orderWay, filters) {
  // 依服務價格排序
  if (orderType === "price") {
    conn.execute(
      `SELECT h.*,u.cover_photo,r.review_count,r.average_star FROM mission_helper_info h LEFT JOIN (SELECT helper_id, SUM(star_rating) /  COUNT(*) AS average_star , COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r ON h.user_id = r.helper_id LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? ${filters} ORDER by h.${filterType}_price ${orderWay} LIMIT ?,?`,
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
      `SELECT h.*,u.cover_photo,r.review_count,r.average_star FROM mission_helper_info h LEFT JOIN (SELECT helper_id, SUM(star_rating) /  COUNT(*) AS average_star , COUNT(*) AS review_count FROM mission_helper_reviews GROUP BY helper_id) r  ON h.user_id = r.helper_id  LEFT JOIN userinfo u ON h.user_id = u.user_id WHERE h.valid = ? ${filters} ORDER by r.review_count ${orderWay} LIMIT ?,?`,
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
      `SELECT DISTINCT h.*, u.cover_photo, CAST(r.average_star AS DECIMAL(10, 2)) AS average_star, r.review_count
      FROM mission_helper_info h
      LEFT JOIN (
        SELECT helper_id, SUM(star_rating) / COUNT(*) AS average_star, COUNT(*) AS review_count
        FROM mission_helper_reviews
        GROUP BY helper_id
      ) r ON h.user_id = r.helper_id
      LEFT JOIN userinfo u ON h.user_id = u.user_id
      WHERE h.valid = ? ${filters}
      ORDER BY average_star ${orderWay}
      LIMIT ?,?`,
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

const transferDate = (date) => {
  const originDate = date;
  const transferDate = new Date(originDate);
  const year = transferDate.getFullYear();
  const month = transferDate.getMonth() + 1;
  const day = transferDate.getDate();
  const newFormat = `${year}年${month}月${day}日`;
  return newFormat;
};
