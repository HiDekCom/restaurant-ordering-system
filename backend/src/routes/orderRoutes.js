import express from "express";
import db from "../config/db.js";
import { io } from "../server.js";

const router = express.Router();


// =========================
// CREATE ORDER
// =========================
router.post("/", (req, res) => {
  const { cartItems, totalPrice } = req.body;

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

      // 🔥 FIX: ส่งข้อมูลไป frontend จริง
      io.emit("newOrder", {
        orderId,
        totalPrice,
      });

      res.json({
        message: "Order Created",
        orderId,
      });
    });
  });
});


// =========================
// GET ALL ORDERS
// =========================
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM orders
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, orders) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }

    const formattedOrders = Promise.all(
      orders.map((order) => {
        return new Promise((resolve, reject) => {
          const itemSql = `
            SELECT
              order_items.quantity,
              menus.name
            FROM order_items
            JOIN menus ON order_items.menu_id = menus.id
            WHERE order_items.order_id = ?
          `;

          db.query(itemSql, [order.id], (err, items) => {
            if (err) return reject(err);

            resolve({
              ...order,
              items: items || [],
            });
          });
        });
      })
    );

    formattedOrders
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Format Error",
        });
      });
  });
});


// =========================
// UPDATE ORDER STATUS
// =========================
router.put("/:id", (req, res) => {
  const { status } = req.body;

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Update Failed",
      });
    }

    // 🔥 FIX: ส่ง event พร้อมข้อมูล
    io.emit("orderUpdated", {
      orderId: req.params.id,
      status,
    });

    res.json({
      message: "Status Updated",
      orderId: req.params.id,
      status,
    });
  });
});

export default router;