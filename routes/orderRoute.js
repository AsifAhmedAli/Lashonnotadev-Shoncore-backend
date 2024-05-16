const OrderController = require("../controllers/orderController");

const router = require("express").Router();

router.post("/createorder", OrderController.CreateOrder);
router.get("/orders", OrderController.getAllOrders);
router.get("/orderdetail/:id", OrderController.getOrderDetail);
router.get("/orderupdate/:id", OrderController.updateOrderDetail);
router.get("/cancelorder/:id", OrderController.cancelOrder);
router.delete("/deleteorder/:id", OrderController.deleteOrder);

module.exports = router;
