import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api/api";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const handleConfirmOrder = async () => {
    try {
      await axios.post(`${API_URL}/api/orders`, {
        cartItems,
        totalPrice,
      });

      clearCart();
      navigate("/");
      alert("Order Success!");
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
          {totalItems} Items
        </span>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">No items in cart</p>
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
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div>
                <h2 className="font-bold text-lg">{item.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-bold">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                ฿{item.price * item.qty}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
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
          <h2 className="text-2xl font-bold">Total: ฿{totalPrice}</h2>
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-green-500 text-white py-3 rounded-xl mt-5 hover:bg-green-600 transition"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}