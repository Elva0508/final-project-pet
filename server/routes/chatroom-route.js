const router = require("express").Router();
const connection = require("../db");

// 抓取目前已登入user的某個聊天室內容
// "http://localhost:3005/api/chatroom/" + chatlist_id
router.get("/:cid", (req, res) => {
  const cid = req.params.cid;
  connection.execute(
    `SELECT chat_content.*, userinfo.*
   FROM chat_content
   INNER JOIN userinfo ON chat_content.talk_userId = userinfo.user_id
   WHERE chat_content.chatlist_id = ?`,
    [cid], // 參數傳遞 chatlist_id
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        if (result.length > 0) {
          // 如果找到了内容，回傳
          res.json(result);
        } else {
          // 如果未找到内容，回覆錯誤
          res.status(404).json({ error: "未找到聊天紀錄" });
        }
      }
    }
  );
});

router.get("/userinfo/:uid", (req, res) => {
  const uid = req.params.uid;
  connection.execute(
    `SELECT user_id, name, cover_photo
    FROM userinfo
    WHERE user_id = ?`,
    [uid], // 參數傳遞 uid
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        if (result.length > 0) {
          // 如果找到了内容，回傳
          res.json(result);
        } else {
          // 如果未找到内容，回覆錯誤
          res.status(404).json({ error: "未找到聊天紀錄" });
        }
      }
    }
  );
});

router.post("/sendchat", (req, res) => {
  console.log("接收到消息請求");
  const { chatlist_id, talk_userId, chat_content } = req.body;
  // 把 chatlist_id 轉換為整數
  const chatlistIdAsInt = parseInt(chatlist_id, 10);
  console.log("chatlist_id:", chatlist_id);
  console.log("talk_userId:", talk_userId);
  console.log("chat_content:", chat_content);

  const timestamp = new Date(); // 建立時間戳記

  // 檢查是否有聊天內容
  if (!chatlist_id || !talk_userId || !chat_content) {
    return res.status(400).json({ error: "請提供有效的聊天訊息" });
  }

  connection.execute(
    `INSERT INTO chat_content(chatlist_id, talk_userId, chat_content, timestamp)
    VALUES (?, ?, ?, ?);`,
    [chatlistIdAsInt, talk_userId, chat_content, timestamp],
    (error, result) => {
      if (error) {
        console.error("傳送訊息時出錯", error);
        return res.status(500).json({ error: "伺服器錯誤" });
      }

      res
        .status(201)
        .json({ message: "訊息已成功傳送", insertId: result.insertId });
    }
  );
});


router.post("/sendchat2", (req, res) => {
  console.log("接收到消息請求");
  const { chatlist_id, talk_userId, chat_content } = req.body;
  // 把 chatlist_id 轉換為整數
  const chatlistIdAsInt = parseInt(chatlist_id, 10);
  console.log("chatlist_id:", chatlist_id);
  console.log("talk_userId:", talk_userId);
  console.log("chat_content:", chat_content);

  const timestamp = new Date(); // 建立時間戳記

  // 檢查是否有聊天內容
  if (!chatlist_id || !talk_userId || !chat_content) {
    return res.status(400).json({ error: "請提供有效的聊天訊息" });
  }

  if (!Array.isArray(chat_content)) {
    // 如果 chat_content 不是陣列，轉換為包含單個聊天內容的陣列
    chat_content = [chat_content];
  }

  // 使用 Promise.all 來處理多個 INSERT 查詢
  const insertQueries = chat_content.map((content) => {
    return new Promise((resolve, reject) => {
      connection.execute(
        `INSERT INTO chat_content(chatlist_id, talk_userId, chat_content, timestamp)
        VALUES (?, ?, ?, ?);`,
        [chatlistIdAsInt, talk_userId, content, timestamp],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });

  // 使用 Promise.all 執行多個 INSERT 查詢
  Promise.all(insertQueries)
    .then(() => {
      res.status(201).json({ message: "訊息已成功傳送" });
    })
    .catch((error) => {
      console.error("傳送訊息時出錯", error);
      res.status(500).json({ error: "伺服器錯誤" });
    });
});


router.get("/", (req, res) => {
  res.send("測試");
});

module.exports = router;
