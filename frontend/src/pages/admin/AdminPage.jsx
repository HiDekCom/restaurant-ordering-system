import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api/api";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu"); // "menu" | "checkout"
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMenus();
    fetchOrders();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menus`);
      setMenus(response.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.log("Fetch orders error:", error);
    }
  };

  // จัดกลุ่ม orders ตามโต๊ะ (เฉพาะที่ยังไม่ paid)
  const activeOrders = orders.filter((o) => o.status !== "paid");
  const groupedByTable = activeOrders.reduce((acc, order) => {
    const table = order.table_number;
    if (!acc[table]) acc[table] = [];
    acc[table].push(order);
    return acc;
  }, {});

  const handleCheckout = async (tableNumber) => {
    const confirm = window.confirm(`เช็คบิลโต๊ะ ${tableNumber} ?`);
    if (!confirm) return;
    try {
      await axios.put(`${API_URL}/api/orders/checkout/${tableNumber}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);
    setFormData({ name: menu.name, price: menu.price, category: menu.category, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("image", formData.image);
      await axios.post(`${API_URL}/api/menus`, data);
      fetchMenus();
      setFormData({ name: "", price: "", category: "", image: null });
    } catch (error) {
      console.log("Create error:", error);
    }
  };

  const updateMenu = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);
      await axios.put(`${API_URL}/api/menus/${editingId}`, data);
      fetchMenus();
      setEditingId(null);
      setFormData({ name: "", price: "", category: "", image: null });
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/menus/${id}`);
      fetchMenus();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
        >
          📊 Dashboard
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "menu"
              ? "bg-black text-white"
              : "bg-white text-gray-500 hover:bg-gray-200"
          }`}
        >
          🍽️ เมนู
        </button>
        <button
          onClick={() => setActiveTab("checkout")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "checkout"
              ? "bg-black text-white"
              : "bg-white text-gray-500 hover:bg-gray-200"
          }`}
        >
          💳 เช็คบิล
          {/* Badge แสดงจำนวนโต๊ะที่มี orders */}
          {Object.keys(groupedByTable).length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {Object.keys(groupedByTable).length}
            </span>
          )}
        </button>
      </div>

      {/* TAB: เมนู */}
      {activeTab === "menu" && (
        <>
          <p className="text-gray-500 text-sm mb-4">
            เมนูทั้งหมด: <span className="font-bold text-gray-700">{menus.length} รายการ</span>
          </p>

          {/* FORM */}
          <form
            onSubmit={editingId ? updateMenu : handleSubmit}
            className="bg-white p-5 rounded-2xl shadow mb-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <input type="text" name="name" placeholder="Menu Name" value={formData.name}
                onChange={handleChange} className="border p-3 rounded-xl" required />
              <input type="number" name="price" placeholder="Price" value={formData.price}
                onChange={handleChange} className="border p-3 rounded-xl" required />
              <select name="category" value={formData.category} onChange={handleChange}
                className="border p-3 rounded-xl" required>
                <option value="">Select Category</option>
                <option value="Rice">Rice</option>
                <option value="Noodle">Noodle</option>
                <option value="Drink">Drink</option>
                <option value="Dessert">Dessert</option>
              </select>
              <input type="file" name="image" onChange={handleChange} className="border p-3 rounded-xl" />
            </div>

            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="preview"
                className="w-40 h-40 object-cover rounded-xl mt-4" />
            )}

            <div className="flex gap-3 mt-4">
              <button className="bg-black text-white px-5 py-3 rounded-xl">
                {editingId ? "Update Menu" : "Add Menu"}
              </button>
              {editingId && (
                <button type="button"
                  onClick={() => { setEditingId(null); setFormData({ name: "", price: "", category: "", image: null }); }}
                  className="bg-gray-300 px-5 py-3 rounded-xl">
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* MENU LIST */}
          <div className="grid md:grid-cols-3 gap-5">
            {menus.map((menu) => (
              <div key={menu.id} className="bg-white rounded-2xl shadow overflow-hidden">
                <img src={menu.image} alt={menu.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{menu.name}</h2>
                  <p className="text-green-600 font-bold text-lg mt-2">฿{menu.price}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(menu)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">Edit</button>
                    <button onClick={() => deleteMenu(menu.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB: เช็คบิล */}
      {activeTab === "checkout" && (
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-xl font-bold mb-4">💳 เช็คบิลโต๊ะ</h2>

          {Object.keys(groupedByTable).length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-lg">
              ไม่มีโต๊ะที่รอเช็คบิล
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedByTable).map(([table, tableOrders]) => {
                const total = tableOrders.reduce(
                  (sum, o) => sum + parseFloat(o.total_price || 0), 0
                );
                return (
                  <div key={table} className="flex justify-between items-center border rounded-xl p-4">
                    <div>
                      <p className="font-bold text-lg">โต๊ะ {table}</p>
                      <p className="text-gray-500 text-sm">
                        {tableOrders.length} ออเดอร์ · รวม ฿{total.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCheckout(table)}
                      className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
                    >
                      💳 เช็คบิล
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}