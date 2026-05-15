const menus = [
  {
    id: 1,
    name: "Fried Rice",
    price: 59,
  },
  {
    id: 2,
    name: "Pad Thai",
    price: 79,
  },
];

export default function MenuPage() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Restaurant Menu
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border rounded-xl p-4 shadow"
          >
            <h2 className="text-xl font-semibold">
              {menu.name}
            </h2>

            <p>{menu.price} บาท</p>

            <button className="bg-black text-white px-4 py-2 rounded mt-3">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}