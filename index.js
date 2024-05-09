const express = require('express');
const app = express();
const port = 3000;
const User = require('./models/user')

const sendEmail = require("./controllers/sendEmail"); //mail route



app.get('/', (req, res) => {
  res.send('Hello World!');
});


User.sync({force: true})


// mail
app.get("/mail",sendEmail) ;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});