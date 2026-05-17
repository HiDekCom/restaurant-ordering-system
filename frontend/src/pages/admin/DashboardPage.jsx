import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMenus: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menusRes, ordersRes] = await Promise.all([
        axios.get(`${API_URL}/api/menus`),
        axios.get(`${API_URL}/api/orders`),
      ]);
      setOrders(ordersRes.data);
      setStats({
        totalMenus: menusRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRevenue: ordersRes.data.reduce(
          (sum, order) => sum + parseFloat(order.total_price || 0), 0
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate("/admin")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
        >
          ← กลับ
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
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

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <h2 className="text-xl font-bold p-5 border-b">📋 รายการออเดอร์</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-gray-500">Order ID</th>
              <th className="text-left p-4 text-gray-500">รายการ</th>
              <th className="text-left p-4 text-gray-500">ราคารวม</th>
              <th className="text-left p-4 text-gray-500">สถานะ</th>
              <th className="text-left p-4 text-gray-500">เวลา</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">
                  {order.items?.map((item, i) => (
                    <span key={i} className="block text-sm">
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-green-600 font-bold">
                  ฿{order.total_price}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    order.status === "Completed" ? "bg-green-500" :
                    order.status === "Cooking" ? "bg-orange-500" :
                    "bg-gray-400"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString("th-TH")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}