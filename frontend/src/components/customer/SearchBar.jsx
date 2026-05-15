import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search menu..."
        className="w-full bg-white p-4 pl-12 rounded-2xl shadow-sm outline-none"
      />
    </div>
  );
}