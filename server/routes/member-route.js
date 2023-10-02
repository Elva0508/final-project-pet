const router = require("express").Router();
const conn = require("../db");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/helper-image")); // 設置上傳文件的儲存路徑
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // 設置上傳文件的文件名
  },
});

const upload = multer({ storage: storage });
router.get("/", (req, res) => {
  res.send("member-route測試成功");
});

router.get("/helper", (req, res) => {
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
router.patch("/helper/valid", async (req, res) => {
  const { user_id, valid } = req.body;

  // 驗證使用者是否存在
  const checkUser = await new Promise((resolve, reject) => {
    return conn.execute(
      `SELECT * FROM users WHERE user_id = ?`,
      [user_id],
      (err, results) => {
        if (err) {
          reject(
            res.status(500).send({ status: 500, error: "使用者查詢錯誤" })
          );
        }
        resolve(results.length);
      }
    );
  });
  if (!checkUser) {
    return res.status(400).send({ status: 400, msg: "查無該使用者" });
  }

  if (!valid) {
    // valid當前為false(代表想要開啟)，先檢查是否有該使用者的小幫手資料
    const isExist = await new Promise((resolve, reject) => {
      return conn.execute(
        `SELECT user_id FROM mission_helper_info WHERE user_id = ?`,
        [user_id],
        (err, results) => {
          if (err) {
            reject(res.status(500).send({ status: 500, error: "查詢錯誤" }));
          }
          resolve(results.length);
        }
      );
    });
    if (isExist) {
      console.log(
        "有找到該使用者的小幫手資料，修改valid值後將資料帶回給客戶端"
      );

      // 修改valid值
      await new Promise((resolve, reject) => {
        return conn.execute(
          "UPDATE `mission_helper_info` SET `valid` = ? WHERE `mission_helper_info`.`user_id` = ?",
          [1, user_id],
          (err, results) => {
            if (err) {
              reject(res.status(500).send({ status: 500, error: "查詢錯誤" }));
            } else if (results.affectedRows === 0) {
              reject(res.status(500).send({ status: 500, error: "更新失敗" }));
            }
            resolve(results);
          }
        );
      });

      const helper_info_promise = new Promise((resolve, reject) => {
        return conn.execute(
          `SELECT * FROM mission_helper_info WHERE user_id = ?`,
          [user_id],
          (err, results) => {
            if (err) {
              reject(res.status(500).send({ status: 500, error: "查詢錯誤" }));
            }
            resolve(results);
          }
        );
      });
      const helper_image_promise = new Promise((resolve, reject) => {
        return conn.execute(
          `SELECT file_path FROM image_helper WHERE group_id = ?`,
          [user_id],
          (err, results) => {
            if (err) {
              reject(res.status(500).send({ status: 500, error: "查詢錯誤" }));
            }
            resolve(results);
          }
        );
      });
      let [info, image] = await Promise.all([
        helper_info_promise,
        helper_image_promise,
      ]);
      return res.send({ status: 200, info, image });
    } else {
      console.log("沒找到，要幫使用者建立一筆新的小幫手資料");

      // 先查詢對應的user資料
      const { name, phone, city, email } = await new Promise(
        (resolve, reject) => {
          return conn.execute(
            `SELECT ui.*,u.email FROM userinfo ui LEFT JOIN users u ON u.user_id = ui.user_id WHERE ui.user_id = ?`,
            [user_id],
            (err, results) => {
              if (err) {
                reject(
                  res.status(500).send({ status: 500, error: "查詢錯誤" })
                );
              }
              resolve(results[0]);
            }
          );
        }
      );

      // 用取得的user資料新增一筆小幫手資料
      const newHelperInfo = await new Promise((resolve, reject) => {
        return conn.execute(
          "INSERT INTO `mission_helper_info` (`user_id`, `name`, `Introduction`, `email`, `phone`, `job_description`, `service_county`, `feed_service`, `house_service`, `beauty_service`, `feed_price`, `house_price`, `beauty_price`, `valid`) VALUES (?, ?, '', ?, ?, '', ?, 0, 0, 0, 0, 0, 0, ?)",
          [user_id, name, email, phone, city, 1],
          (err, results) => {
            if (err) {
              reject(
                res
                  .status(500)
                  .send({ status: 500, error: "小幫手資料寫入資料庫錯誤" })
              );
            }
            resolve(results);
          }
        );
      });

      // 將新增成功的小幫手資料帶回client端
      conn.execute(
        `SELECT * FROM mission_helper_info WHERE user_id = ? AND valid = ?`,
        [user_id, 1],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              status: 500,
              msg: "伺服器查詢小幫手資料錯誤",
            });
          }
          return res.send({ status: 200, data: results[0] });
        }
      );
    }
    return;
  } else {
    // valid為true(要關閉)，修改小幫手資料的valid = 0
    conn.execute(
      "UPDATE `mission_helper_info` SET `valid` = ? WHERE `mission_helper_info`.`user_id` = ?",
      [0, user_id],
      (err, results) => {
        if (err) {
          res.status(500).send({ status: 500, error: "伺服器錯誤" });
        } else if (results.affectedRows === 0) {
          res.status(500).send({ status: 500, error: "更新失敗" });
        }
        return res.send({ status: 200, msg: "修改valid成功" });
      }
    );
  }
});
router.put("/helper", upload.array("helper-image"), async (req, res) => {
  try {
    const {
      user_id,
      name,
      introduction,
      email,
      phone,
      job_description,
      feedprice,
      houseprice,
      beautyprice,
      service_county,
      feed_service,
      house_service,
      beauty_service,
    } = req.body;

    console.log(req.files);

    // 更新小幫手資料
    const updateResult = await new Promise((resolve, reject) => {
      conn.execute(
        "UPDATE `mission_helper_info` SET `name` = ?, `Introduction` = ?, `email` = ?, `phone` = ?, `job_description` = ?, `service_county` = ?, `feed_service` = ?, `house_service` = ?, `beauty_service` = ?, `feed_price` = ?, `house_price` = ?, `beauty_price` = ? WHERE `mission_helper_info`.`user_id` = ?",
        [
          name,
          introduction,
          email,
          phone,
          job_description,
          service_county,
          feed_service,
          house_service,
          beauty_service,
          feedprice,
          houseprice,
          beautyprice,
          user_id,
        ],
        (err, results) => {
          if (err) {
            reject({ status: 500, error: "查詢錯誤" });
          }
          resolve(results);
        }
      );
    });

    // 先刪除舊的小幫手照片
    const deleteImageResult = await new Promise((resolve, reject) => {
      conn.execute(
        "DELETE FROM image_helper WHERE `image_helper`.`group_id` = ?",
        [user_id],
        (err, results) => {
          if (err) {
            reject({ status: 500, error: "查詢錯誤" });
          }
          resolve(results);
        }
      );
    });

    // 再增加新的小幫手照片
    const insertImageResults = await Promise.all(
      req.files.map(async (image) => {
        try {
          const file_path = `http://localhost:3005/helper-image/${image.filename}`;
          return await new Promise((resolve, reject) => {
            conn.execute(
              "INSERT INTO `image_helper` (`image_id`, `group_id`, `file_path`) VALUES (NULL, ?, ?)",
              [user_id, file_path],
              (err, results) => {
                if (err) {
                  reject({ status: 500, error: "查詢錯誤" });
                }
                resolve(results);
              }
            );
          });
        } catch (error) {
          throw error;
        }
      })
    );

    // 將更新後的資料回傳至client端

    const infoPromise = new Promise((resolve, reject) => {
      conn.execute(
        `SELECT * FROM mission_helper_info WHERE user_id = ? AND valid = ?`,
        [user_id, 1],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result[0]);
        }
      );
    });
    const imagesPromise = new Promise((resolve, reject) => {
      conn.execute(
        `SELECT file_path FROM image_helper WHERE group_id = ?`,
        [user_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
    // 使用 Promise.all 等待所有查詢完成
    const [info, images] = await Promise.all([infoPromise, imagesPromise]);

    res.status(200).send({ status: 200, info, images });
  } catch (error) {
    // 錯誤處理
    console.error(error);
  }
});
module.exports = router;
