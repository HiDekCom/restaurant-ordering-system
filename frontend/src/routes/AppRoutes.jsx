import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import OrderStatusPage from "../pages/customer/OrderStatusPage";

import KitchenPage from "../pages/kitchen/KitchenPage";
import AdminPage from "../pages/admin/AdminPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../pages/admin/DashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/menu" 
          element={<MenuPage />} 
        />

        <Route 
          path="/cart" 
          element={<CartPage />} 
        />

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
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}