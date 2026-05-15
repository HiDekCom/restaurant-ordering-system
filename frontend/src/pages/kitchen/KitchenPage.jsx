const orders = [
  {
    id: 101,
    table: 5,
    status: "Cooking",
  },
  {
    id: 102,
    table: 2,
    status: "Pending",
  },
];

export default function KitchenPage() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Kitchen Monitor
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 shadow"
          >
            <h2>Order #{order.id}</h2>

            <p>Table: {order.table}</p>

            <p>Status: {order.status}</p>

            <button className="bg-green-500 text-white px-4 py-2 rounded mt-3">
              Ready
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}