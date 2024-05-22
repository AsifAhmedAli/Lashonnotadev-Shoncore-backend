const userController = require("../controllers/userController");
// const isAuthenticated = require("../Middleware/auth.js");
const router = require("express").Router();
// const validateRequest = require('../Middleware/validate-request.js');
const Joi = require("joi");
const { registerValidationRules, validate } = require("../middlewares/valid");
const isAuthenticated = require("../middlewares/auth");

// router.post("/add", userController.addUser);
router.get("/users", isAuthenticated, userController.getUsers);
router.post(
  "/registers",
  registerValidationRules(),
  validate,
  userController.register
);
router.post("/login", userController.login);
router.post("/userdetail/:id", isAuthenticated, userController.getUser);
router.post("/userupdate/:id", isAuthenticated, userController.patchUsers);
router.post("/forgotPassword", userController.forgotPassword);
router.delete("/delete/:id", isAuthenticated, userController.deleteUsers);
router.post("/password/reset/:token", userController.resetPassword);
router.get("/verify/:id", userController.verifyEmail);
router.get("/logout", userController.logout);

module.exports = router;

// for login validation
