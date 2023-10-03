const express = require("express");
const router = require("express").Router();
const app = express();
//app.use(express.json());
const multer = require("multer");
const upload = multer();

const jwt = require("jsonwebtoken");
const secretKey = "thisistokensecretkey";

const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

//const cors = require("cors");
// 存取`.env`設定檔案使用// 獲得加密用字串
require('dotenv').config();



//---------------------------------------------

// 設定部份
// let whitelist = [
//   "http://127.0.0.1:3005",
//   "http://localhost:3005",
//   "http://127.0.0.1:3000",
//   "http://localhost:3000",
//   undefined,
// ];
// let corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// const app = express();
// app.use(cors(corsOptions));
// //解析 json 格式的要求主體
// app.use(express.json());
// //解析 URL 編碼的要求主體
// app.use(express.urlencoded({ extended: true }));
//---------------------------------------------
const mysql = require("mysql2");

const getUsers = async (req, res) => {
  try {
    const sql = "SELECT user_id, username, email FROM users"; 

    // 建立MySQL連接
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "admin",
      password: "12345",
      database: "cat",
    });

    // 執行查詢
    connection.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
      connection.end(); // 關閉連接
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "password 不一致" });

   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);
  
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
    connection.query(createUserQuery, [name, email, hashPassword], (insertError) => {
      if (insertError) {
        console.error(insertError);
        return res.status(500).json({ error: "資料庫輸入有問題" });
      }
      res.json({ msg: "Register Success" });

      // 關閉連接
      connection.end();
      res.json({ msg: "Register Success" });
    });
  });
};

const Login = async (req, res) => {
  console.log(req.body)
  try {
    // 建立MySQL連接
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "admin",
      password: "12345",
      database: "cat",
    });

    // 查詢用戶
    const { email, password } = req.body;
    const emailQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(emailQuery,req.body.email, async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "資料庫 Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: "Email 找不到!" });
      }

      const user = results[0];

      // 檢查密碼
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log('Password comparison result:', match);
      if (!match) return res.status(400).json({ msg: "Wrong password" });

      const userId = user.id;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
      });
      const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
      });

      // 更新refresh_token字段
      const updateQuery = "UPDATE users SET refresh_token = ? WHERE email = ?";
      connection.query(updateQuery, [refreshToken, email], (updateError) => {
        if (updateError) {
          console.error(updateError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

        // 關閉連接
        connection.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  const { email, password } = req.body;
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "admin",
      password: "12345",
      database: "cat",
    });
    // 查詢用戶
    const tokenQuery = "SELECT * FROM users WHERE refresh_token = ?";
    const [rows] = await connection.promise().query(tokenQuery, [refreshToken]);

    if (rows.length === 0) return res.sendStatus(204);

    const user = rows[0];

    // 更新refresh_token字段為null
    //const userId = user.id;
    const updateQuery = "UPDATE users SET refresh_token = null WHERE email = ?";
    await connection.promise().query(updateQuery, [email]);

    // 關閉連接
    connection.end();
    res.json({ msg: "Logout Success" });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//-----------
router.get("/", (req, res) => {
  res.send("auth-jwt測試成功，這是 auth-jwt 路由的根路徑");
});
router.get("/test", (req, res) => {
  const user = req.user;
  return res.json({ message: "authorized", user });
});

router.get("/", (req, res) => {
  res.send("auth-jwt測試成功，這是 auth-jwt 路由的根路徑");
});
// 在Express應用程序中使用路由
router.get("/getUsers", getUsers);
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login",upload.none() , Login);
// router.get("/token", refreshToken);
// router.delete("/logout", Logout);
router.post("/users",(req, res) => {

})
//-----


function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
}

module.exports = router;
