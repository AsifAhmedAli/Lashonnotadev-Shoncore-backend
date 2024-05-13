const {Sequelize, Model, DataTypes} = require('sequelize');

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
    logging: false,
    dialect: 'mysql'
  });


  try {
   sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const db = {} ;
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user')(sequelize , DataTypes, Model);
db.sequelize.sync({force: false});

module.exports = db


