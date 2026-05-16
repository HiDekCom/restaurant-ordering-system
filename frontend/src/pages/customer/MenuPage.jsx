import Navbar from "../../components/customer/Navbar";
import SearchBar from "../../components/customer/SearchBar";
import CategoryFilter from "../../components/customer/CategoryFilter";
import MenuCard from "../../components/customer/MenuCard";

import { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../../api/api";

export default function MenuPage() {

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-5">

        <SearchBar />

        <div className="mt-5">
          <CategoryFilter />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          {menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
            />
          ))}

        </div>

      </div>

    </div>
  );
}