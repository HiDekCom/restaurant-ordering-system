import { useEffect, useState } from "react";

import axios from "axios";

export default function AdminPage() {
  const [menus, setMenus] = useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      price: "",
      image: null,
    });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/menus"
      );

      setMenus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files } =
        e.target;

    setFormData({
        ...formData,
        [name]: files
        ? files[0]
        : value,
    });
  };

  // CREATE MENU
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = new FormData();

        data.append(
          "name",
          formData.name
        );

        data.append(
          "price",
          formData.price
        );

        data.append(
          "image",
          formData.image
        );

        await axios.post(
          "http://localhost:5000/api/menus",
          data
        );

        fetchMenus();

        setFormData({
          name: "",
          price: "",
          image: null,
        });

    } catch (error) {
        console.log(error);
    }
  };

  // DELETE MENU
  const deleteMenu = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/menus/${id}`
      );

      fetchMenus();
    } catch (error) {
      console.log(error);
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
            
            {formData.image && (
              <img
                src={URL.createObjectURL(
                  formData.image
                )}
                alt="preview"
                className="w-40 h-40 object-cover rounded-xl mt-4"
              />
            )}

        </div>

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
                onClick={() =>
                  deleteMenu(menu.id)
                }
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