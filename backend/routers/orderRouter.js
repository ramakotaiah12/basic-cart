const express = require("express");
const Order = require("../models/orderModel");
const router = new express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//create the products private route
//@ /api/products/create
router.post("/orders/create", auth, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ Error: "No order items" });
    }
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//get my orders
router.get("/orders/myorders", auth, async (req, res) => {
  try {
    console.log(typeof req.user._id);
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//get the order by id private route
//@ /api/orders/:id
router.get("/orders/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(200).json({ order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
// get all orders by admin
router.get("/orders", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
router.put("/orders/:id/pay", auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    }
    await order.save();
    res.status(200).json({ order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
router.put("/orders/:id/deliver", auth,admin, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now()
    }
    await order.save();
    res.status(200).json({ order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});

module.exports = router;
