const paymentController = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/paymentintent", paymentController.payments);

router.post("/AddstripUser", paymentController.createCustomer);

router.post("/Addcardinfo", paymentController.addNewCard);


module.exports = router;
