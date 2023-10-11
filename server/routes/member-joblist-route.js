const router = require("express").Router();
const connection=require("../db");


router.get("/", (req, res) => {
    connection.execute(
      `SELECT mf.*,md.title AS title,md.price AS price ,md.start_date AS start_date ,md.end_date AS end_date,md.city AS city ,md.area AS area ,
      md.location_detail AS location_detail ,md.description AS description,md.mission_status AS mission_status ,md.post_date AS post_date,md.post_user_id AS post_user_id,u.username AS post_name,mr.mission_id AS record_mission_id,mr.job_date AS job_date
      FROM mission_fav AS mf
      JOIN mission_detail AS md ON mf.mission_id=md.mission_id
      JOIN users AS u ON u.user_id =md.post_user_id
      LEFT JOIN mission_record AS mr ON mr.mission_id = md.mission_id AND mr.user_id = mf.user_id
      WHERE mf.user_id = 1;`,
      (error, result) => {
        res.json({ result });
      }
    );
  });



module.exports = router;