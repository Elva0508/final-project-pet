const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "admin",
  password: "12345",
  database: "cat",
});

module.exports = connection;
