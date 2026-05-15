import express from "express";

import db from "../config/db.js";

const router = express.Router();

// CREATE ORDER
router.post("/", (req, res) => {
  const { cartItems, totalPrice } = req.body;

  // บันทึก orders
  const orderSql =
    "INSERT INTO orders (total_price) VALUES (?)";

  db.query(orderSql, [totalPrice], (err, orderResult) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Order Error",
      });
    }

    const orderId = orderResult.insertId;

    // เตรียม order items
    const orderItems = cartItems.map((item) => [
      orderId,
      item.id,
      item.qty,
      item.price,
    ]);

    const itemSql = `
      INSERT INTO order_items
      (order_id, menu_id, quantity, price)
      VALUES ?
    `;

    db.query(itemSql, [orderItems], (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Order Item Error",
        });
      }

      res.json({
        message: "Order Created",
      });
    });
  });
});

export default router;