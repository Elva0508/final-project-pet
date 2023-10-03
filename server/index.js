const mysql = require("mysql2");
const connection = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const memberRouter = require("./routes/member-route");
const workRouter = require("./routes/work-route");
const memberOrderRouter = require("./routes/member-order-route");
const memberWishlistRouter = require("./routes/member-wishlist-route");
const cartRouter = require("./routes/cart-route");
const articleRouter = require("./routes/article-route");
const articleCategoryRouter = require("./routes/article-category");

app.use(cors());
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/member", memberRouter);
app.use("/api/work", workRouter);
app.use("/api/member-order", memberOrderRouter);
app.use("/api/member-wishlist", memberWishlistRouter);
app.use("/api/product/cart", cartRouter);
app.use("/api/article", articleRouter);
app.use("/api/article-category", articleCategoryRouter);

app.listen(3005, () => {
  console.log("server is running");
});

// 聊天室websocket
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (connection) => {
  console.log("新的使用者已連線");

  connection.on("message", (message) => {
    const msg = message.toString("utf-8");
    console.log("收到消息:", msg);
    wss.clients.forEach((client) => {
      client.send(msg);
    });
  });

  connection.on("close", () => {
    console.log("使用者已斷線");
  });
});
