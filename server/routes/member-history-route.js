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

//用來修改刊登任務的狀態
router.put("/:id",(req,res)=>{
    console.log(req)
   const newId=req.params.id
    connection.execute(
        `UPDATE mission_detail SET mission_status=0 WHERE mission_id=?`,
        [newId]
        ,(error,result)=>{
            res.json({result})
        }    
    )
})





module.exports = router;