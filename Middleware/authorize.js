// var db = require('../models');
// // const { USER_ROLE } = require('../models/utils')
// // var User = db.user;  
// const jwt = require('express-jwt');
// // const secret = require('config.js')
// // module.exports = auth = {
// //     authorize,
// //     authorizeAdmin,
// //   };
  
//   module.exports = authorize;

//   function authorize() {
//       return [
//           // authenticate JWT token and attach decoded token to request as req.user
//           jwt({ secret, algorithms: ['HS256'] }),
  
//           // attach full user record to request object
//           async (req, res, next) => {
//               // get user with id from token 'sub' (subject) property
//               const user = await db.User.findByPk(req.user.sub);
  
//               // check user still exists
//               if (!user)
//                   return res.status(401).json({ message: 'Unauthorized' });
  
//               // authorization successful
//               req.user = user.get();
//               next();
//           }
//       ];
//   }
//   // function authorizeAdmin() {
//   //   return [
//   //     // authenticate JWT token and attach decoded token to request as req.user
//   //     jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
  
//   //     // attach full user record to request object
//   //     async (req, res, next) => {
//   //       // get user with id from token 'sub' (subject) property
//   //       const user = await db.User.findByPk(req.user.sub);
  
//   //       // check user still exists
//   //       if (!user) return res.status(401).json({ message: 'You are not Authorized' });
  
//   //       // Admin authorization successful
//   //       if (req.user.role === USER_ROLE.Admin) {
//   //         req.user = user.get();
//   //         next();
//   //       } else {
//   //         res.status(401).json({ message: 'You are not an Admin' });
//   //       }
//   //     },
//   //   ];
//   // }
  
var db = require('../models');
var User = db.user;



const jwt = require("jsonwebtoken");
// const User = require("../Models/userModel");
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(
      res.status(401).json({
        message: "Please Login to Access this Resource",
      })
    );
  } else {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decodeData.user.id);
    if (user) {
      req.user = await User.findById(decodeData.user.id);
      return next();
    } 
  }
};
module.exports = auth;