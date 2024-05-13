const express = require('express');
const app = express();
const port = 3000;
// const User = require('./models/user')
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// var router = express.Router();
var userCtrl = require('./controllers/userController')
// const sendEmail = require("./controllers/sendEmail"); //mail route
require('./models');


// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//********************************USERS*************************************************** */

app.get('/add' ,userCtrl.addUser ) // manually
//api route
app.get('/users' ,userCtrl.getUsers )
// for id
app.get('/users/:id' ,userCtrl.getUser )
// for post
app.post('/users2' ,userCtrl.postUsers )
// for delete
app.delete('/users/:id' ,userCtrl.deleteUsers )


// mail
// app.get("/mail",sendEmail) ;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

