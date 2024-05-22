module.exports = (sequelize, DataTypes, Model) => {
  // const { USER_ROLE } = require('./utils');
  const crypto = require("crypto");

  class User extends Model {
    getResetPasswordToken() {
      // Generating Token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Hashing and adding resetPasswordToken to userSchema
      this.resettoken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      return resetToken;
    }
  }

  User.init(
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: "user" },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      resettoken: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
    }
  );

  return User;
};

// const {DataTypes } = require('sequelize');
// const sequelize = require('.') // db connection

// const User = sequelize.define(
//   'User',
//   {
//     // Model attributes are defined here
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//     // email: { type: DataTypes.STRING, allowNull: false },
//     // // country: { type: DataTypes.STRING, allowNull: false },
//     // password: { type: DataTypes.STRING },
//   },

//   {
//     // Other model options go here
//     tableName: 'users'
//   },
// );

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// module.exports=User
