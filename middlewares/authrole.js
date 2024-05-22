const jwt = require("jsonwebtoken");
// const { User } = require("../models"); // Assuming Sequelize models are in the models folder
var db = require("../models");
var User = db.user;

const AuthenticatedRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
      }

      const decodeData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decodeData.user.id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      req.user = user;

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Role: ${user.role} is not allowed to access this resource`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
};

module.exports = AuthenticatedRoles;