import { useContext } from "react";

import { FaShoppingCart } from "react-icons/fa";

import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  // รวมจำนวนสินค้า
  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold text-gray-800">
          QR Restaurant
        </h1>

        <button className="relative">
          <FaShoppingCart className="text-2xl text-gray-700" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalQty}
          </span>
        </button>
      </div>
    </nav>
  );
}