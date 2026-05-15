import express from "express";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } =
    req.body;

  const sql = `
    SELECT * FROM users
    WHERE username = ?
  `;

  db.query(
    sql,
    [username],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "User Not Found",
        });
      }

      const user = result[0];

      // CHECK PASSWORD
      if (user.password !== password) {
        return res.status(401).json({
          message: "Wrong Password",
        });
      }

      // CREATE TOKEN
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        "SECRET_KEY",
        {
          expiresIn: "1d",
        }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    }
  );
});

export default router;