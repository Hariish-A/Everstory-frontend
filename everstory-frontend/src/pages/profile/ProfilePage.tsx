import { useState } from "react";
import Sidebar from "@/pages/home/components/Sidebar";
import ProfileHeader from "@/pages/profile/components/ProfileHeader";
import EditProfileDialog from "@/pages/profile/components/EditProfileDialog";
import PostGrid from "@/pages/profile/components/PostGrid";
import bg from "@/assets/everstory-bg-plain.png";

const ProfilePage = () => {
  const [editOpen, setEditOpen] = useState(false);
  const isCurrentUser = true;

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
        <div className="max-w-4xl mx-auto bg-[#FAF3E0] rounded-xl shadow-lg p-6">
          {/* Profile Summary */}
          <ProfileHeader onEdit={() => setEditOpen(true)} isCurrentUser={isCurrentUser} />

          {/* Separator */}
          <hr className="my-6 border-[#D6C3AA]" />

          {/* Scrollable Post Section */}
          <div className="max-h-[500px] overflow-y-auto pr-2">
            <PostGrid />
          </div>
        </div>

        {/* Edit Dialog */}
        {editOpen && <EditProfileDialog onClose={() => setEditOpen(false)} />}
      </main>
    </div>
  );
};

export default ProfilePage;
