const orders = [
  {
    id: 101,
    table: 5,
    items: ["Fried Rice", "Pad Thai"],
    status: "Pending",
  },
  {
    id: 102,
    table: 2,
    items: ["Tom Yum"],
    status: "Cooking",
  },
];

export default function KitchenPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-5">
      <h1 className="text-4xl font-bold text-white mb-6">
        Kitchen Monitor
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-5 shadow"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">
                Table {order.table}
              </h2>

              <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            <div className="mt-4">
              {order.items.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>

            <button className="w-full bg-green-500 text-white py-2 rounded-xl mt-5">
              Mark As Ready
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}