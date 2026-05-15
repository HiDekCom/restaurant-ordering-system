import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menus", menuRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});