const express = require('express');
const router = require("express").Router();
const multer = require('multer');
//const moment = require('moment');

const mysql = require("mysql2");

const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";
const upload = multer();

//const bcrypt = require('bcrypt');

//連接資料庫
const db = require("../db");
//---------------------------------------------


// 設定部份
let whitelist = [
  "http://127.0.0.1:3005",
  "http://localhost:3005",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  undefined
];
let corsOptions = {
credentials: true,
origin: function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}
}
const app = express()
app.use(cors(corsOptions))
//解析 json 格式的要求主體
app.use(express.json())
//解析 URL 編碼的要求主體
app.use(express.urlencoded({extended:true}))
//---------------------------------------------


router.get("/", (req,res)=>{
    res.send("auth-jwt測試成功，這是 auth-jwt 路由的根路徑");
})
router.get("/test", (req, res) => {
    const user = req.user
    return res.json({message: 'authorized', user})
  });

router.post("/login", upload.none(), async (req, res) => {
    const { email, password } = req.body;
    try {
      const results = await new Promise((resolve, reject) => {
        // 使用email和password進行登入驗證
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
          if (err) {
            console.error('資料庫-查詢錯誤：', err);
            reject(err);
            return
          }
          if (results.length === 0) {
            reject('帳號或密碼錯誤');
            return
          } else {
            resolve(results[0]);
          }
        });
      });
  
      if (results.length === 0) {
        res.status(401).json({ message: '帳號或密碼錯誤', code: '401' });
        return;
      } else {
        // 登入成功，執行你的JWT發送邏輯
        const user = results;
        const token = jwt.sign(
          {
            user_id: user.user_id, // 使用者的唯一識別符
          username: user.username, // 使用者的名稱
          email: user.email // 使用者的電子郵件
          },
          secretKey,
          { expiresIn: '30m' }
        );
         return res.status(200).json({ message: 'success login', code: '200', token: token })
        
      }
    } catch (err) {
      console.error('捕獲到異常：', err);
      return res.status(500).json({ message: '資料庫查詢錯誤', code: '500' });
    }
  });

router.post("/logout", checkToken,(req,res)=>{
  console.log(req.decoded) //解碼後的資料-終端機
  const currentUser = req.decoded.email;
  db.query('SELECT * FROM users WHERE email = ?', [currentUser], (err, results) => {
    if(err){
      console.error('資料庫-查詢錯誤：', err);
      res.status(500).json({ message: '登出失敗請洽管理人員', code: '500' });
    }else{
      if(results.length>0){
        const token = jwt.sign(
          {
          //清空
          },
          secretKey,
          { expiresIn: '-10s' }
        );
        res.status(200).json({ message: 'success login', code: '200', token: token });
    }
  }})
})

router.post("/checkLogin", checkToken,(req,res)=>{
  const currentUser = req.decoded;
  const token=jwt.sign(
    {
      user_id: currentUser.user_id,
      username: currentUser.username,
      email: currentUser.email
    },
    secretKey,
    { expiresIn: '1d' }

  );
  res.status(200).json({
    message:"用戶已登入",
    code:"200",
    user:{
      user_id: currentUser.user_id,
      username: currentUser.username,
      email: currentUser.email
    },
    token:token
  })

})

//會員基本資料api
router.post("/profile", checkToken,(req,res)=>{
  const currentId = req.decoded.user_id;
  db.query('SELECT * FROM userinfo WHERE user_id = ?',[currentId],(err,results)=>{
    if(err){
      console.error('資料庫-查詢錯誤：', err);
      res.status(500).json({message: '資料庫查詢錯誤', code: '500'});
    }else{
      if(results.length>0){
        res.status(200).json({message:'success',code:'200',results:results})
      }
    }
  })
})
//會員基本資料修改api
router.put("/profile", checkToken, (req, res) => {
  const currentId = req.decoded.user_id;
  const { name,phone, city, area, address, birthday, pet_number, gender } = req.body;
  db.query(
    "UPDATE userinfo SET name = ?, phone = ?, city = ?, area = ?, address = ?, birthday = ?, pet_number = ?, gender = ? WHERE user_id = ?",
    [name,phone, city, area, address, birthday, pet_number, gender, currentId],
    (err, results) => {
      if (err) {
        console.error("資料庫-查詢錯誤：", err);
        res.status(500).json({ message: "資料庫查詢錯誤", code: "500" });
      } else {
        res.status(200).json({ message: "success", code: "200" });
      }
    }
  );
});
//會員密碼修改
router.put("/change-password", checkToken, (req, res) => {
  const currentId = req.decoded.user_id;
  const { oldPassword, newPassword } = req.body;

  db.query(
    "SELECT password FROM userinfo WHERE user_id = ?",
    [currentId],
    (err, results) => {
      if (err) {
        console.error("数据库查询错误：", err);
        res.status(500).json({ message: "数据库查询错误", code: "500" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "用户不存在", code: "404" });
      } else {
        const hashedPassword = results[0].password;

        // 使用bcrypt比较旧密码
        bcrypt.compare(oldPassword, hashedPassword, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            console.error("比较密码错误：", bcryptErr);
            res.status(500).json({ message: "比较密码错误", code: "500" });
          } else if (!isMatch) {
            res.status(400).json({ message: "旧密码不匹配", code: "400" });
          } else {
            // 生成新的加密密码
            bcrypt.hash(newPassword, 10, (hashErr, hashedNewPassword) => {
              if (hashErr) {
                console.error("密码加密错误：", hashErr);
                res.status(500).json({ message: "密码加密错误", code: "500" });
              } else {
                // 更新用户密码
                db.query(
                  "UPDATE userinfo SET password = ? WHERE user_id = ?",
                  [hashedNewPassword, currentId],
                  (updateErr, updateResults) => {
                    if (updateErr) {
                      console.error("数据库更新错误：", updateErr);
                      res.status(500).json({ message: "数据库更新错误", code: "500" });
                    } else {
                      res.status(200).json({ message: "密码修改成功", code: "200" });
                    }
                  }
                );
              }
            });
          }
        });
      }
    }
  );
});



//-------------註冊--------------------------------
const Register = async (req, res) => {
  
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "password 不一致" });

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "admin",
    password: "12345",
    database: "cat",
  });

  // 檢查數據庫中是否存在具有相同email的用戶
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkUserQuery, [email], async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "已經有這個email" });
    }

    if (results.length > 0) {
      return res.status(400).json({ msg: "Email 已存在" });
    }

    // 如果email不存在於數據庫中，則創建新用戶記錄
    const createUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(createUserQuery, [name, email, password], (insertError) => {
      if (insertError) {
        console.error(insertError);
        return res.status(500).json({ error: "資料庫輸入有問題" });
      }
  
      // 關閉連接
      connection.end();
      res.json({ msg: "Register Success" });
    });
  });
};

router.post("/register", Register);

//-------------middleware--------------------------------
function checkToken(req,res,next){
const token = req.headers.authorization;
if(token){
  jwt.verify(token,secretKey,(err,decoded)=>{
    if(err){
      res.status(400).json({message: '登入驗證失效', code: '400'})
      return;
    }
    //成功驗證
    req.decoded = decoded;
    next();
   
  })
}else{
  res.status(400).json({message: 'fail logout 無登入資料', code: '400'})
}
}

 module.exports = router;