const router = require("express").Router();
const connection = require("../db");

router.get("/:id", (req, res) => {
  let id = req.params.id;
  connection.execute(
    `SELECT *
      FROM chatlist
      JOIN chat_content ON chatlist.chatlist_id  = chat_content.chatlist_id
      WHERE chatlist.chatlist_id = ?`,
    [id], // 使用聊天的 chatlist_id 篩選聊天內容
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "資料庫查詢失敗" });
      } else {
        if (result.length > 0) {
          // 如果找到了內容，回傳
          res.json(result);
        } else {
          // 如果未找到內容，回覆錯誤
          res.status(404).json({ error: "未找到" });
        }
      }
    }
  );
});

router.get("/", (req, res) => {
  res.send("測試");
});

module.exports = router;
