const express = require("express");
const app = express();
// const User = require('./models/user')
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// var router = express.Router();
var userCtrl = require("./controllers/userController");
const Users = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "../Lashonnotadev-Shoncore/config/config.env" });
// const sendEmail = require("./controllers/sendEmail"); //mail route
require("./models");
// app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//********************************USERS*************************************************** */

// app.get("/add", userCtrl.addUser); // manually
//api route
// app.get("/users", userCtrl.getUsers);
// for id
// app.get("/users/:id", userCtrl.getUser);
// for post
// app.post("/users", userCtrl.postUsers);
// for delete
// app.delete("/users/:id", userCtrl.deleteUsers);
// for update specific data
// app.patch("/users/:id", userCtrl.patchUsers);
// for check if not exixt in db they update data
// app.put("/users/:id", userCtrl.putUser);
app.use("/api/v1", Users);

// mail
// app.get("/mail",sendEmail) ;

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
