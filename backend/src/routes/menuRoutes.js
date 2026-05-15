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

export default router;