import express from "express";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import path from "path";

const app = express();

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

app.use("/api/menus", menuRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("Client Connected");
});

const PORT =
  process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});