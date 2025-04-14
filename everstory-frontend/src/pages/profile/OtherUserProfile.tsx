import { useLocation } from "react-router-dom";
import Sidebar from "@/pages/home/components/Sidebar";
import PostGrid from "@/pages/profile/components/PostGrid";
import bg from "@/assets/everstory-bg-plain.png";
import { useState } from "react";
import axiosInstance from "@/api/client";
import { toast } from "react-hot-toast";

const mockImages = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  image: `https://placehold.co/300x300?text=Post+${i + 1}`,
}));

const OtherUserProfile = () => {
  const { state: profile } = useLocation();
  const [requestSent, setRequestSent] = useState(false);

  const handleAddFriend = async () => {
    try {
      await axiosInstance.post("http://localhost:8031/friendship/send", {
        friend_id: profile.id,
      });
      toast.success("Friend request sent ✅");
      setRequestSent(true);
    } catch (err) {
      toast.error("Failed to send request");
      console.error("Friend request error:", err);
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar />

      <main className="flex-1 px-6 pt-16 pl-[110px] overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-[#FAF3E0] rounded-xl shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-6">
              <img
                src={profile?.profile_pic || "https://placehold.co/100x100"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="space-y-1 text-sm text-gray-700">
                <p>{profile?.name}</p>
                <p>@{profile?.username}</p>
                <p>{profile?.website}</p>
                <p>{profile?.bio}</p>
              </div>
            </div>

            {/* Add Friend Button */}
            <button
              onClick={handleAddFriend}
              disabled={requestSent}
              className={`${
                requestSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#614426] hover:bg-[#4e331f]"
              } text-white px-4 py-2 rounded-full transition`}
            >
              {requestSent ? "Request Sent" : "Add Friend"}
            </button>
          </div>

          <hr className="my-6 border-[#D6C3AA]" />

          <div className="max-h-[500px] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 gap-2">
              {mockImages.map((post) => (
                <img
                  key={post.id}
                  src={post.image}
                  alt={`Post ${post.id}`}
                  className="w-[200px] h-[200px] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OtherUserProfile;
