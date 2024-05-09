const {Sequelize} = require('sequelize')


// Create MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: "",
//     // port: 3306,   
//     database: "test"
//   });



//Sequelize connection to database
  const sequelize = new Sequelize('test', 'root', 'Umair@1122', {
    host: 'localhost',
    dialect: 'mysql'
  });


  try {
   sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize


