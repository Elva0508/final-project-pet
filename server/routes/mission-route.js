const router = require("express").Router();
const conn = require("../db");
router.get("/", (req, res) => {
  res.send("mission-route測試成功");
});

router.get("/all-missions", (req, res) => {
  conn.execute(
    `SELECT md.*, im.file_path AS file_path
    FROM mission_detail AS md 
    JOIN users AS u ON md.post_user_id=u.user_id 
    JOIN image_mission AS im ON md.mission_id = im.mission_id
    WHERE md.post_user_id = 1;`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ status: 200, data: result });
    }
  );
});


module.exports = router;