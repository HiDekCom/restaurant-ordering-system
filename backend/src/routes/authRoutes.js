import express from "express";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database Error" });
  }
});

export default router;