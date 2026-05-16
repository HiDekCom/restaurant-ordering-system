import express from "express";
import db from "../config/db.js";
import upload from "../config/multer.js";

const router = express.Router();

// GET MENUS
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM menus");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database Error" });
  }
});

// CREATE MENU
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = `https://restaurant-backend-c9qm.onrender.com/uploads/${req.file.filename}`;

    await db.query(
      "INSERT INTO menus (name, price, image) VALUES ($1, $2, $3)",
      [name, price, image]
    );

    res.json({ message: "Menu Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Create Menu Failed" });
  }
});

// DELETE MENU
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM menus WHERE id = $1", [req.params.id]);
    res.json({ message: "Menu Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete Failed" });
  }
});

export default router;