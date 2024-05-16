const paymentController = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/paymentintent", paymentController.payments);


module.exports = router;
