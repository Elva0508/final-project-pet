const router = require("express").Router();
const connection = require("../db");

// 同時找u1 u2 都有某位user的時候
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

router.get("/", (req, res) => {
  res.send("測試");
});

module.exports = router;
