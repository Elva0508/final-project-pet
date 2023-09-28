const mysql = require("mysql2");
const connection = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const cartRouter = require("./routes/cart-route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api/product/cart", cartRouter);

app.listen(3005, () => {
  console.log("server is running");
});







