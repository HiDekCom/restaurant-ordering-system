import express from "express";
import db from "../config/db.js";
import { io } from "../server.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { cartItems, totalPrice, tableNumber } = req.body;

    // GET LAST QUEUE OF TABLE
    const lastQueue = await db.query(
      `
      SELECT MAX(queue_number) as last_queue
      FROM orders
      WHERE table_number = $1
      `,
      [tableNumber]
    );
    const queueNumber =
      (lastQueue.rows[0].last_queue || 0) + 1;

    const orderResult = await db.query(
      "INSERT INTO orders (total_price, table_number, queue_number) VALUES ($1, $2, $3) RETURNING id",
      [totalPrice, tableNumber, queueNumber]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.id, item.qty, item.price]
      );
    }

    io.emit("newOrder", { orderId, totalPrice });
    res.json({ message: "Order Created", orderId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order Error" });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    const formattedOrders = await Promise.all(
      orders.rows.map(async (order) => {
        const items = await db.query(
          `SELECT order_items.quantity, menus.name
           FROM order_items
           JOIN menus ON order_items.menu_id = menus.id
           WHERE order_items.order_id = $1`,
          [order.id]
        );
        return { ...order, items: items.rows || [] };
      })
    );

    res.json(formattedOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database Error" });
  }
});

// GET ORDERS BY TABLE
router.get("/:tableNumber", async (req, res) => {
  try {

    const orders = await db.query(
      `
      SELECT *
      FROM orders
      WHERE table_number = $1
      ORDER BY created_at DESC
      `,
      [req.params.tableNumber]
    );

    const formattedOrders = await Promise.all(

      orders.rows.map(async (order) => {

        const items = await db.query(
          `
          SELECT order_items.quantity, menus.name
          FROM order_items
          JOIN menus
          ON order_items.menu_id = menus.id
          WHERE order_items.order_id = $1
          `,
          [order.id]
        );

        return {
          ...order,
          items: items.rows || [],
        };
      })
    );

    res.json(formattedOrders);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
});

// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await db.query(
      "UPDATE orders SET status = $1 WHERE id = $2",
      [status, req.params.id]
    );

    io.emit("orderUpdated", { orderId: req.params.id, status });
    res.json({ message: "Status Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update Failed" });
  }
});

export default router;