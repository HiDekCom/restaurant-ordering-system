import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api/api";

export default function AdminPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menus`);
      setMenus(response.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);

    setFormData({
      name: menu.name,
      price: menu.price,
      category: menu.category,
      image: null,
    });
  };

  const [editingId, setEditingId] = useState(null);

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

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(
        `${API_URL}/api/menus/${editingId}`,
        data
      );

      fetchMenus();

      setEditingId(null);

      setFormData({
        name: "",
        price: "",
        category: "",
        image: null,
      });

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

      {/* HEADER — เพิ่มปุ่ม Dashboard */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
        >
          📊 Dashboard
        </button>
      </div>

      {/* STATS */}
      <p className="text-gray-500 text-sm mb-4">
        เมนูทั้งหมด: <span className="font-bold text-gray-700">{menus.length} รายการ</span>
      </p>

      {/* FORM */}
      <form
        onSubmit={editingId ? updateMenu : handleSubmit}
        className="bg-white p-5 rounded-2xl shadow mb-6"
      >
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Menu Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          >
            <option value="">Select Category</option>
            <option value="Rice">Rice</option>
            <option value="Noodle">Noodle</option>
            <option value="Drink">Drink</option>
            <option value="Dessert">Dessert</option>
          </select>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />
        </div>

        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="preview"
            className="w-40 h-40 object-cover rounded-xl mt-4"
          />
        )}

        <div className="flex gap-3 mt-4">
          <button className="bg-black text-white px-5 py-3 rounded-xl">
            {editingId ? "Update Menu" : "Add Menu"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);

                setFormData({
                  name: "",
                  price: "",
                  category: "",
                  image: null,
                });
              }}
              className="bg-gray-300 px-5 py-3 rounded-xl"
            >
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

              {/* NAME */}
              <h2 className="text-xl font-bold text-gray-800">
                {menu.name}
              </h2>

              {/* PRICE */}
              <p className="text-green-600 font-bold text-lg mt-2">
                ฿{menu.price}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(menu)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMenu(menu.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}