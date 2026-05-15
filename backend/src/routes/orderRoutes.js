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

// GET ALL ORDERS
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM orders
    ORDER BY created_at DESC
  `;

  db.query(sql, async (err, orders) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    // ดึง items ของแต่ละ order
    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        return new Promise((resolve, reject) => {
          const itemSql = `
            SELECT
              order_items.quantity,
              menus.name
            FROM order_items
            JOIN menus
            ON order_items.menu_id = menus.id
            WHERE order_items.order_id = ?
          `;

          db.query(
            itemSql,
            [order.id],
            (err, items) => {
              if (err) {
                reject(err);
              }

              resolve({
                ...order,
                items,
              });
            }
          );
        });
      })
    );

    res.json(formattedOrders);
  });
});

// UPDATE ORDER STATUS
router.put("/:id", (req, res) => {
  const { status } = req.body;

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, req.params.id],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Update Failed",
        });
      }

      res.json({
        message: "Status Updated",
      });
    }
  );
});

export default router;