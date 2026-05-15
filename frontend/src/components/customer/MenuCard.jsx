export default function MenuCard({ menu }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={menu.image}
        alt={menu.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {menu.name}
        </h2>

        <p className="text-gray-500 mt-2">
          Delicious Menu
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-green-600">
            ฿{menu.price}
          </p>

          <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}