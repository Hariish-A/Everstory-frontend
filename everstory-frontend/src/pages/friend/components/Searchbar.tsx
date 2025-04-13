import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div
      className="flex items-center px-4"
      style={{
        backgroundColor: "#FEE9E7",
        borderRadius: "28px",
        height: "48px",
        width: "400px",
      }}
    >
      <input
        type="text"
        placeholder="Search Friends"
        className="bg-transparent flex-1 text-black placeholder:text-gray-700 focus:outline-none"
      />
      <Search className="h-5 w-5 text-black" />
    </div>
  );
};

export default SearchBar;
