export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {

  const categories = [
    "All",
    "Rice",
    "Noodle",
    "Drink",
    "Dessert",
  ];

  return (
    <div className="flex gap-4 flex-wrap">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            px-6 py-3 rounded-full border transition

            ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white"
            }
          `}
        >
          {category}
        </button>

      ))}

    </div>
  );
}