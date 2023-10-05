const router = require("express").Router();
const connection=require("../db");


router.get("/", (req, res) => {
    connection.execute(
      `SELECT md.*
      FROM mission_detail AS md 
      WHERE md.post_user_id = 1
      ORDER BY md.post_date DESC;`,
      (error, result) => {
        res.json({ result });
      }
    );
  });







module.exports = router;