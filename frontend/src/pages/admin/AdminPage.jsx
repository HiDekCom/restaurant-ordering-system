import { useEffect, useState } from "react";
import axios from "axios";

// 🔥 API URL (ต้องมาจาก .env)
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const [menus, setMenus] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  // GET MENUS
  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/menus`
      );

      setMenus(response.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // CREATE MENU
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("image", formData.image);

      await axios.post(
        `${API_URL}/api/menus`,
        data
      );

      fetchMenus();

      setFormData({
        name: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.log("Create error:", error);
    }
  };

  // DELETE MENU
  const deleteMenu = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/menus/${id}`
      );

      fetchMenus();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-2xl shadow mb-6"
      >
        <div className="grid md:grid-cols-3 gap-4">

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

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

        </div>

        {/* Preview image */}
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="preview"
            className="w-40 h-40 object-cover rounded-xl mt-4"
          />
        )}

        <button className="mt-4 bg-black text-white px-5 py-3 rounded-xl">
          Add Menu
        </button>
      </form>

      {/* MENU LIST */}
      <div className="grid md:grid-cols-3 gap-5">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-xl">
                {menu.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                ฿{menu.price}
              </p>

              <button
                onClick={() => deleteMenu(menu.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}