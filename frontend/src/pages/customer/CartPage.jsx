import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      name: "Fried Rice",
      qty: 2,
      price: 59,
    },
    {
      id: 2,
      name: "Pad Thai",
      qty: 1,
      price: 79,
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">
        Cart
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              <p>Quantity: {item.qty}</p>
            </div>

            <p className="font-bold">
              {item.qty * item.price} บาท
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-2xl font-bold">
          Total: {total} บาท
        </h2>

        <button
          onClick={() => navigate("/status")}
          className="w-full bg-green-500 text-white py-3 rounded-xl mt-5"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}