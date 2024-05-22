const jwt = require("jsonwebtoken");
var db = require("../models");
var User = db.user;

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please Login to Access this Resource",
    });
  }

  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findByPk(decodeData.user.id);

    // if (!user) {
    //   user = await Rider.findByPk(decodeData.user.id);
    // }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = auth;