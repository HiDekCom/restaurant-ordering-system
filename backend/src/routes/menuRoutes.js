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
    const { name, price, category } = req.body;
    const image = req.file.path;

    await db.query(
      "INSERT INTO menus (name, price, category, image) VALUES ($1, $2, $3, $4)",
      [name, price, category, image]
    );

    res.json({ message: "Menu Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Create Menu Failed" });
  }
});

// UPDATE MENU
router.put("/:id", upload.single("image"), async (req, res) => {
  try {

    const { name, price, category } = req.body;

    let image = null;

    // ถ้ามีอัปโหลดรูปใหม่
    if (req.file) {
      image = req.file.path;
    }

    // มีรูปใหม่
    if (image) {

      await db.query(
        `UPDATE menus
         SET name = $1,
             price = $2,
             category = $3,
             image = $4
         WHERE id = $5`,
        [name, price, category, image, req.params.id]
      );

    } else {

      // ไม่มีรูปใหม่
      await db.query(
        `UPDATE menus
         SET name = $1,
             price = $2,
             category = $3
         WHERE id = $4`,
        [name, price, category, req.params.id]
      );

    }

    res.json({ message: "Menu Updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update Failed" });
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