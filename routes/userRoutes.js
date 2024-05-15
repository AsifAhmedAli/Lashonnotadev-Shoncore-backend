const userController = require("../controllers/userController");

const router = require("express").Router();

router.post("/add", userController.addUser);
router.get("/users", userController.getUsers);

module.exports = router;
