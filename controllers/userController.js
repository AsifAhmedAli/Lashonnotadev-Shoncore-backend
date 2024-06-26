var db = require("../models");
var User = db.user;
const Joi = require("joi");
// const isAuthenticated = require("../Middleware/auth.js");
// const AuthenticatedRoles = require("../Middleware/authrole.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "../Lashonnotadev-Shoncore/config/config.env" });
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

exports.getUsers = async (req, res) => {
  await User.findAll()
    .then((users) => {
      return res.status(200).json({
        success: true,
        message: users,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Internal server error " + err.message,
      });
    });
};
//get user
exports.getUser = async (req, res) => {
  await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      return res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Internal server error " + err.message,
      });
    });
};

// for delete
exports.deleteUsers = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Internal server error " + err.message,
      });
    });
};

// update user
exports.patchUsers = async (req, res) => {
  try {
    var updatedData = req.body;
    const data = await User.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    if (data[0] === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.status(200).json({ message: "User updated successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user registration
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        res.status(402).json({
          message: "This user is already exist",
        });
      } else {
        if (req.body.password === req.body.confirmPassword) {
          bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err.message,
              });
            } else {
              const users = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role,
              });
              const data = {
                user: {
                  id: users.id,
                },
              };
              const authToken = jwt.sign(data, process.env.JWT_SECRET);
              const verifyEmailURL = `${req.protocol}://${req.get(
                "host"
              )}/api/v1/verify/${users.id}`;

              const message = `Please click here :- \n\n ${verifyEmailURL} \n\n to veirfy your email...`;

              sendEmail({
                email: req.body.email,
                subject: `Nayab Email verification `,
                message,
              });

              res
                .status(200)
                .cookie("token", authToken, {
                  expires: new Date(Date.now() + 25892000000),
                  httpOnly: true,
                })
                .json({
                  success : true,
                  message: `User registered successfully please verify yout email at : ${req.body.email}`,
                  users,
                });
            }
          });
        } else {
          res.status(400).json({
            message: "Password not matched",
          });
        }
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json(err);
    });
};

// user login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({
        message: "Enter Email & Password",
      });
    }



if (user.verified == 0 ){

  return res.status(400).json({ message: "You are not verified yet. Please confirm your Email first"})
}

    const isMatch = await bcrypt.compare(req.body.password, user.password);



    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password ",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", authToken, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      })
      .json({
        success: true,
        authToken,
        user,
      });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      console.log("This is user", user);
      return res.status(400).json({
        message: "User not found",
      });
    }

    const resetToken = user.getResetPasswordToken();
    console.log("1->" + resetToken);
    await user.save({ validate: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is: \n\n ${resetPasswordURL} \n\n If you did not request this email, please ignore it.`;
    console.log("2->" + resetToken);

    await sendEmail({
      email: user.email,
      subject: "Nayab Password Recovery",
      message,
    });
    console.log("3->" + resetToken);

    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    user.resettoken = undefined;
    await user.save({ validate: false });

    return res.status(500).json({
      error: error.message,
    });
  }
};

//  reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      where: { resettoken: resetPasswordToken },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset Password token is invalid or has expired",
      });
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    user.password = hashedPassword;
    user.resettoken = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// verify code
exports.verifyEmail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id: id },
    });

    if (!user) {
      return res.status(400).json({
        message: "Email not verified",
      });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({
      message: "You are verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// logout

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is populated by your authentication middleware
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
