const express = require("express");
const app = express();
// const User = require('./models/user')
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// var router = express.Router();
var userCtrl = require("./controllers/userController");
const Users = require("./routes/userRoutes");
const News = require("./routes/newsRoutes");
const Products = require("./routes/productRoutes");
const Order = require("./routes/orderRoute");
const Payment = require("./routes/payment");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "../Lashonnotadev-Shoncore/config/config.env" });

// const sendEmail = require("./controllers/sendEmail"); //mail route
require("./models");
// app.use(express.json());

var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//********************************USERS*************************************************** */

app.use("/api/v1", Users);
app.use("/api/v1", News);
app.use("/api/v1", Products);
app.use("/api/v1", Order);
app.use("/api/v1", Payment);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
