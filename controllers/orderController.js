var db = require("../models");
var Order = db.orders;
var Product = db.products;

// create order
exports.CreateOrder = async (req, res, next) => {
  const {
    city,
    state,
    country,
    pinCode,
    phoneNo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    products,
  } = req.body;

  //   const userId = req.user.id; // Assuming you have user authentication middleware

  // Create the order
  const order = await Order.create({
    city,
    state,
    country,
    pinCode,
    phoneNo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderAt: new Date(),
    user: 90,
    productItems: products,
  });

  if (order) {
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

// get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    // Map over the orders and convert the productItems field from string to array
    const ordersWithArrayItems = orders.map((order) => {
      return {
        ...order.toJSON(),
        productItems: JSON.parse(order.productItems),
      };
    });

    res.status(200).json({ success: true, data: ordersWithArrayItems });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// get order detail
exports.getOrderDetail = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // Convert the productItems field from string to array
    const orderWithArrayItems = {
      ...order.toJSON(),
      productItems: JSON.parse(order.productItems),
    };

    res.status(200).json({ success: true, data: orderWithArrayItems });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// update order detail
exports.updateOrderDetail = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order already delivered",
      });
    }

    const orderWithArrayItems = {
      ...order.toJSON(),
      productItems: JSON.parse(order.productItems),
    };

    for (const result of orderWithArrayItems.productItems) {
      await updateStock(result.productId, result.quantity);
    }
    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    await order.save(); // Save the changes to the order

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error("Error updating order detail:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update refrence
async function updateStock(id, quantity) {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    product.stock -= quantity;

    await product.save({ validate: false });

    console.log(`Stock updated for product with ID ${id}`);
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}

// Cancel order
exports.cancelOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order already delivered",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error("Error updating order detail:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Order
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.destroy({ where: { id: orderId } });
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error updating order detail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
