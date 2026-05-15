import express from "express";

import db from "../config/db.js";

const router = express.Router();

// GET MENUS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM menus";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(result);
  });
});

// CREATE MENU
router.post("/", (req, res) => {
  const { name, price, image } =
    req.body;

  const sql = `
    INSERT INTO menus
    (name, price, image)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, price, image],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Create Menu Failed",
        });
      }

      res.json({
        message: "Menu Created",
      });
    }
  );
});

// DELETE MENU
router.delete("/:id", (req, res) => {
  const sql = `
    DELETE FROM menus
    WHERE id = ?
  `;

  db.query(
    sql,
    [req.params.id],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Delete Failed",
        });
      }

      res.json({
        message: "Menu Deleted",
      });
    }
  );
});

export default router;