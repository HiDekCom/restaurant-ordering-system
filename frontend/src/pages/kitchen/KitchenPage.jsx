import { useEffect, useState } from "react";

import axios from "axios";
import { io } from "socket.io-client";
import API_URL from "../../api/api";

const socket = io(API_URL);

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

useEffect(() => {
  fetchOrders();

  socket.on("newOrder", () => {
    fetchOrders();
  });

  socket.on("orderUpdated", () => {
    fetchOrders();
  });

  return () => {
    socket.off("newOrder");
    socket.off("orderUpdated");
  };
}, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/orders`
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/${id}`,
        {
            status,
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold mb-6">
        Kitchen Monitor
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Order #{order.id}
              </h2>

              <div className="text-right">
                <p className="font-bold text-green-600">
                    ฿{order.total_price}
                </p>
                <span
                    className={`
                    text-xs px-3 py-1 rounded-full text-white
                    ${
                        order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Cooking"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }
                    `}
                >
                    {order.status}
                </span>
                </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between"
                >
                  <p>{item.name}</p>

                  <p>x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-5">
                <button
                    onClick={() =>
                    updateStatus(order.id, "Cooking")
                    }
                    className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
                >
                    Cooking
                </button>
                <button
                    onClick={() =>
                    updateStatus(order.id, "Completed")
                    }
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
                >
                    Completed
                </button>
                </div>
          </div>
        ))}

      </div>
    </div>
  );
}