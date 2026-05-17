import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMenus: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [menusRes, ordersRes] = await Promise.all([
        axios.get(`${API_URL}/api/menus`),
        axios.get(`${API_URL}/api/orders`),
      ]);

      const totalMenus = menusRes.data.length;
      const totalOrders = ordersRes.data.length;
      const totalRevenue = ordersRes.data.reduce(
        (sum, order) => sum + parseFloat(order.total_price || 0), 0
      );

      setStats({ totalMenus, totalOrders, totalRevenue });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">จำนวนเมนูทั้งหมด</h2>
          <p className="text-4xl font-bold mt-2 text-blue-600">
            {stats.totalMenus}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">จำนวนออเดอร์ทั้งหมด</h2>
          <p className="text-4xl font-bold mt-2 text-orange-500">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">รายได้รวม</h2>
          <p className="text-4xl font-bold mt-2 text-green-600">
            ฿{stats.totalRevenue.toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}