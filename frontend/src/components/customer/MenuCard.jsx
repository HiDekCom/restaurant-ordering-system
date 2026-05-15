export default function MenuCard({ menu }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      
      {/* รูปอาหาร */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* รายละเอียด */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {menu.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Delicious food menu
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-green-600">
            ฿{menu.price}
          </p>

          <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}