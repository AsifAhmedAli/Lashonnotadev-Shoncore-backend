const paymentController = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/paymentintent", paymentController.payments);

router.post("/AddstripUser", paymentController.createCustomer);

router.post("/Addcardinfo", paymentController.addNewCard);

router.post("/create-checkout-session", paymentController.checkout);
module.exports = router;
