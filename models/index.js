const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "../Lashonnotadev-Shoncore/config/config.env" });

//Sequelize connection to database
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  logging: false,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, DataTypes, Model);
db.news = require("./newsModel")(sequelize, DataTypes, Model);
db.products = require("./productModel")(sequelize, DataTypes, Model);
db.orders = require("./orderModel")(sequelize, DataTypes, Model);
db.sequelize.sync({ force: false });

module.exports = db;
