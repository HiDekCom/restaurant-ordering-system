import express from "express";

const router = express.Router();

const menus = [
  {
    id: 1,
    name: "Fried Rice",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
  },
  {
    id: 2,
    name: "Pad Thai",
    price: 79,
    image:
      "https://surl.li/zjuorh",
  },
  {
    id: 3,
    name: "Tom Yum",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12",
  },
  {
    id: 4,
    name: "Green Curry",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  },
];

router.get("/", (req, res) => {
  res.json(menus);
});

export default router;