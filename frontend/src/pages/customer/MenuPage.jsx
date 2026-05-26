import Navbar from "../../components/customer/Navbar";
import SearchBar from "../../components/customer/SearchBar";
import CategoryFilter from "../../components/customer/CategoryFilter";
import MenuCard from "../../components/customer/MenuCard";

import { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../../api/api";

export default function MenuPage() {

  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetchMenus();
    fetchOrders();
  }, []);

  // FETCH MENUS
  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/menus`
      );
      setMenus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ORDERS
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

  // FILTER CATEGORY
  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter(
          (menu) => menu.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-5">
        <SearchBar />

        {/* BUTTON MY ORDERS */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowOrders(!showOrders)}
            className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            🧾 {showOrders ? "Hide Orders" : "My Orders"}
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mt-5">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* MENU LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
            />
          ))}
        </div>

        {/* MY ORDERS */}
        {showOrders && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              🧾 Your Orders
            </h2>

            <div className="space-y-5">
              {orders.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
                  No orders yet
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-5 rounded-2xl shadow"
                  >
                    {/* ORDER HEADER */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-xl">
                          Order #{order.id}
                        </h3>

                        <p className="text-gray-500">
                          {new Date(order.created_at)
                            .toLocaleString()}
                        </p>
                      </div>

                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                        {order.status || "Pending"}
                      </span>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="space-y-2">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between"
                        >
                          <p>
                            {item.name}
                          </p>

                          <p>
                            x{item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* TOTAL */}
                    <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                      <p>Total</p>

                      <p>
                        ฿{order.total_price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}