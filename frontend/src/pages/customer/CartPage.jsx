import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">
                {item.name}
              </h2>

              <p className="text-gray-500">
                Quantity: {item.qty}
              </p>
            </div>

            <p className="text-xl font-bold text-green-600">
              ฿{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white p-5 rounded-2xl shadow mt-6">
        <h2 className="text-2xl font-bold">
          Total: ฿{totalPrice}
        </h2>

        <button className="w-full bg-green-500 text-white py-3 rounded-xl mt-5 hover:bg-green-600 transition">
          Confirm Order
        </button>
      </div>
    </div>
  );
}