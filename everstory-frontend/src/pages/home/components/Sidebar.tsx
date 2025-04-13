import { Home, Users, LogOut } from "lucide-react";
import logo from "@/assets/everstory-logo-wide.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFeedClick = () => {
    if (location.pathname === "/for-you") {
      // Force refresh workaround
      navigate("/temp", { replace: true });
      setTimeout(() => navigate("/for-you", { replace: true }), 0);
    } else {
      navigate("/for-you");
    }
  };

  const handleFriendsClick = () => {
    if (location.pathname !== "/friends") {
      navigate("/friends");
    }
  };

  return (
    <div className="w-[308px] min-h-screen bg-[#614426] text-white flex flex-col justify-between pb-6 px-4">
      {/* Top Section */}
      <div>
        <div className="mb-3 -ml-6 -mt-4">
          <img
            src={logo}
            alt="Everstory Logo"
            className="w-[280px] h-auto object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        <nav className="flex flex-col space-y-8">
          <button
            onClick={handleFeedClick}
            className="flex items-center gap-4 text-xl w-full group pl-4"
          >
            <Home size={28} className="text-orange-400" />
            <span className="text-yellow-400 group-hover:text-orange-300 transition-colors">
              Feed
            </span>
          </button>

          <button
            onClick={handleFriendsClick}
            className="flex items-center gap-4 text-xl w-full group pl-4"
          >
            <Users size={28} className="text-orange-400" />
            <span className="text-yellow-400 group-hover:text-orange-300 transition-colors">
              Friends
            </span>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="border-t border-white/30 mb-4" />
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <span className="text-white text-sm">Profile</span>
          </div>
          <button className="text-white hover:text-orange-300 transition">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
