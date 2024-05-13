module.exports = (sequelize ,DataTypes , Model) =>{


class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: 'Hassan'
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
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