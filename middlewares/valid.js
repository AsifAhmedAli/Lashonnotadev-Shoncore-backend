const { body, validationResult } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .notEmpty()
      .withMessage("Please Enter A valid name"),
    body("email")
      .isEmail()
      .withMessage("Please Enter A Valid Email")
      .isLength({ max: 320 })
      .withMessage("Password must contain up to 320 characters")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Please Enter A Valid Password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isLength({ max: 128 })
      .withMessage("Password must contain up to 128 characters")
      .matches(/[A-Z]/g)
      .withMessage("Password must contain an upper case letter")
      .matches(/[a-z]/g)
      .withMessage("Password must contain a lower case letter")
      .matches(/[0-9]/g)
      .withMessage("Password must contain a number")
      .not()
      .matches(/\s/g)
      .withMessage("Please do not use space characters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  registerValidationRules,
  validate,
};
