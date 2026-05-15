import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import OrderStatusPage from "../pages/customer/OrderStatusPage";

import KitchenPage from "../pages/kitchen/KitchenPage";

import DashboardPage from "../pages/admin/DashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/status"
          element={<OrderStatusPage />}
        />

        <Route
          path="/kitchen"
          element={<KitchenPage />}
        />

        <Route
          path="/admin"
          element={<DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}