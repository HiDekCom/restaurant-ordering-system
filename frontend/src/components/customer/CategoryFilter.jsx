const categories = [
  "All",
  "Rice",
  "Noodle",
  "Drink",
  "Dessert",
];

export default function CategoryFilter() {
  return (
    <div className="flex gap-3 overflow-x-auto py-2">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-5 py-2 rounded-full whitespace-nowrap transition
            ${
              index === 0
                ? "bg-black text-white"
                : "bg-white shadow-sm"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}