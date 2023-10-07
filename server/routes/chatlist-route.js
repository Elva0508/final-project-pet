const router = require("express").Router();
const connection = require("../db");

// 同時找u1 u2 都有某位user的時候
router.get("/:uid", (req, res) => {
  const uid = req.params.uid;
  connection.execute(
    `SELECT *
      FROM chatlist AS c
      JOIN userinfo AS u1 ON c.chatlist_userId1 = u1.user_id
      JOIN userinfo AS u2 ON c.chatlist_userId2 = u2.user_id
      WHERE u1.user_id = ? OR u2.user_id = ?`,
    [uid, uid], // 筛选 chatlist_userId1 或 chatlist_userId2 包含 uid 的记录
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
