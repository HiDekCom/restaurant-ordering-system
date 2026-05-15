import { useEffect, useState } from "react";

import axios from "axios";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(response.data);
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

              <span className="text-gray-500 text-sm">
                ฿{order.total_price}
              </span>
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

            <button className="w-full mt-5 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
              Complete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}