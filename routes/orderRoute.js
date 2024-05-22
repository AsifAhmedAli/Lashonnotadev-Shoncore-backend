const OrderController = require("../controllers/orderController");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/createorder", isAuthenticated, OrderController.CreateOrder);
router.get("/orders", isAuthenticated, OrderController.getAllOrders);
router.get("/orderdetail/:id", isAuthenticated, OrderController.getOrderDetail);
router.get(
  "/orderupdate/:id",
  isAuthenticated,
  OrderController.updateOrderDetail
);
router.get("/cancelorder/:id", isAuthenticated, OrderController.cancelOrder);
router.delete("/deleteorder/:id", isAuthenticated, OrderController.deleteOrder);

module.exports = router;
