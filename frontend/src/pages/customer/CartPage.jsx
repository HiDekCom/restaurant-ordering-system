import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    } = useContext(CartContext);

  // คำนวณราคารวม
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No items in cart
          </p>
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
          >
            
            <div className="flex items-center gap-4">

                {/* รูปอาหาร */}
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                />

                {/* รายละเอียด */}
                <div>
                    <h2 className="font-bold text-lg">
                    {item.name}
                    </h2>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-2">
                    
                    <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                    >
                        -
                    </button>

                    <span className="font-bold">
                        {item.qty}
                    </span>

                    <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                    >
                        +
                    </button>
                    </div>
                </div>
                </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                ฿{item.price * item.qty}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      {cartItems.length > 0 && (
        <div className="bg-white p-5 rounded-2xl shadow mt-6">
          <h2 className="text-2xl font-bold">
            Total: ฿{totalPrice}
          </h2>

          <button className="w-full bg-green-500 text-white py-3 rounded-xl mt-5 hover:bg-green-600 transition">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}