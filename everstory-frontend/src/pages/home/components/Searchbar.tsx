// src/pages/home/components/Searchbar.tsx
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/client";

const SearchBar = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await axiosInstance.get("/auth/all?skip=0&limit=10");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    if (showDropdown) fetchUsers();
  }, [showDropdown]);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setShowDropdown(true)}
        className="flex items-center px-4"
        style={{
          backgroundColor: "#FEE9E7",
          borderRadius: "28px",
          height: "48px",
        }}
      >
        <input
          type="text"
          placeholder="Search Users"
          className="bg-transparent flex-1 text-black placeholder:text-gray-700 focus:outline-none"
        />
        <Search className="h-5 w-5 text-black" />
      </div>

      {showDropdown && users.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded shadow-lg max-h-60 overflow-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/user/${user.id}`, { state: user });
                setShowDropdown(false);
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
