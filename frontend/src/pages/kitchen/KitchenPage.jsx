import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import API_URL from "../../api/api";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);
  const [paidTables, setPaidTables] = useState([]); // โต๊ะที่เพิ่งเช็คบิล

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ["websocket"],
    });

    fetchOrders();

    socket.on("newOrder", fetchOrders);
    socket.on("orderUpdated", fetchOrders);

    // รับ event เมื่อมีการเช็คบิล
    socket.on("tableCheckedOut", ({ tableNumber }) => {
      // แจ้งเตือนในครัวว่าโต๊ะไหนเช็คบิลแล้ว
      setPaidTables((prev) => [...prev, String(tableNumber)]);
      fetchOrders();

      // ลบออกหลัง 10 วินาที
      setTimeout(() => {
        setPaidTables((prev) => prev.filter((t) => t !== String(tableNumber)));
      }, 10000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.log("Fetch orders error:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log("Update status error:", error);
    }
  };

  // แยก orders เป็น paid และ active
  const activeOrders = orders.filter((o) => o.status !== "paid");
  const paidOrders = orders.filter(
    (o) => o.status === "paid" && paidTables.includes(String(o.table_number))
  );

  const statusStyle = {
    Pending: "bg-gray-500",
    Cooking: "bg-orange-500",
    Completed: "bg-green-500",
    paid: "bg-blue-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold mb-6">Kitchen Monitor</h1>

      {/* แจ้งเตือนโต๊ะที่เพิ่งเช็คบิล */}
      {paidTables.length > 0 && (
        <div className="mb-6 space-y-2">
          {paidTables.map((table) => (
            <div
              key={table}
              className="bg-blue-100 border border-blue-400 text-blue-800 px-5 py-3 rounded-xl font-bold flex items-center gap-2"
            >
              💳 โต๊ะ {table} เช็คบิลแล้ว — เคลียร์โต๊ะได้เลย!
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">

        {/* ACTIVE ORDERS */}
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-2xl shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Table {order.table_number} - Order #{order.queue_number}
              </h2>
              <div className="text-right">
                <p className="font-bold text-green-600">฿{order.total_price}</p>
                <span className={`text-xs px-3 py-1 rounded-full text-white ${statusStyle[order.status] || "bg-gray-500"}`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-2">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.name}</p>
                  <p>x{item.quantity}</p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => updateStatus(order.id, "Cooking")}
                className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
              >
                Cooking
              </button>
              <button
                onClick={() => updateStatus(order.id, "Completed")}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
              >
                Completed
              </button>
            </div>
          </div>
        ))}

        {/* PAID ORDERS — แสดงเฉพาะที่เพิ่งเช็คบิล (10 วิ) */}
        {paidOrders.map((order) => (
          <div
            key={order.id}
            className="bg-blue-50 border-2 border-blue-300 p-5 rounded-2xl shadow opacity-70"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                Table {order.table_number} - Order #{order.queue_number}
              </h2>
              <div className="text-right">
                <p className="font-bold text-blue-600">฿{order.total_price}</p>
                <span className="text-xs px-3 py-1 rounded-full text-white bg-blue-500">
                  💳 paid
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-2">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between text-blue-800">
                  <p>{item.name}</p>
                  <p>x{item.quantity}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-blue-500 font-bold text-sm">
              ✅ เช็คบิลแล้ว — card นี้จะหายไปใน 10 วินาที
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}