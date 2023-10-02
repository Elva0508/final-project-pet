const mysql=require("mysql2");
const connection=require("./db");
const express=require("express");
const app=express();
const cors = require('cors');
const bodyParser=require('body-parser')

const memberRouter = require("./routes/member-route");
const workRouter = require("./routes/work-route");
const memberOrderRouter = require("./routes/member-order-route");
const memberWishlistRouter = require("./routes/member-wishlist-route");
const cartRouter = require("./routes/cart-route");

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


app.listen(3005,()=>{
    console.log("server is running");
})
