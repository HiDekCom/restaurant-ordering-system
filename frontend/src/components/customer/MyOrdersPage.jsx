import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api/api";

export default function MyOrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/api/orders`
      );

      setOrders(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="space-y-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white p-5 rounded-2xl shadow"
          >

            <div className="flex justify-between items-center mb-4">

              <div>
                <h2 className="font-bold text-xl">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500">
                  {new Date(order.created_at)
                    .toLocaleString()}
                </p>
              </div>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                {order.status}
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

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <p>Total</p>
              <p>฿{order.total_price}</p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}