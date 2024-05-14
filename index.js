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
// app.use(express.json());
var bodyParser = require('body-parser')
app.use(bodyParser.json());


//********************************USERS*************************************************** */

app.get('/add' ,userCtrl.addUser ) // manually
//api route
app.get('/users' ,userCtrl.getUsers )
// for id
app.get('/users/:id' ,userCtrl.getUser )
// for post
app.post('/users' ,userCtrl.postUsers )
// for delete
app.delete('/users/:id' ,userCtrl.deleteUsers )
// for update specific data
app.patch('/users/:id' ,userCtrl.patchUsers )
// for check if not exixt in db they update data
app.put('/users/:id' ,userCtrl.putUser )

// mail
// app.get("/mail",sendEmail) ;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

