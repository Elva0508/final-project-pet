// const mysql = require("mysql2");
// const jwt = require("jsonwebtoken");

// const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) return res.sendStatus(401);

//     const connection = mysql.createConnection({
//         host: "localhost",
//         port: 3306,
//         user: "admin",
//         password: "12345",
//         database: "cat",
//       });

//     // 查詢用戶
//     const query = "SELECT * FROM users WHERE refresh_token = ?";
//     const [rows] = await connection.promise().query(query, [refreshToken]);

//     if (rows.length === 0) return res.sendStatus(403);

//     const user = rows[0];

//     // 驗證刷新令牌
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if (err) return res.sendStatus(403);

//       const userId = user.id;
//       const name = user.name;
//       const email = user.email;
//       const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '15s'
//       });

//       // 關閉連接
//       connection.end();

//       res.json({ accessToken });
//     });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// };

// module.exports = refreshToken;
