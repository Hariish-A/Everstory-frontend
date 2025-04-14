// src/pages/profile/ProfilePage.tsx
import { useState, useEffect } from "react";
import Sidebar from "@/pages/home/components/Sidebar";
import ProfileHeader from "@/pages/profile/components/ProfileHeader";
import EditProfileDialog from "@/pages/profile/components/EditProfileDialog";
import PostGrid from "@/pages/profile/components/PostGrid";
import bg from "@/assets/everstory-bg-plain.png";
import { useApiGet } from "@/hooks/useApi";

const ProfilePage = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { data, isSuccess, refetch } = useApiGet(["profile"], "http://localhost:8011/auth/me", {
    retry: false,
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess) setProfileData(data);
  }, [data, isSuccess]);

  const handleSave = () => {
    setEditOpen(false);
    refetch(); // Refresh profile data after save
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
          <ProfileHeader
            onEdit={() => setEditOpen(true)}
            isCurrentUser={true}
            profile={profileData}
          />

          <hr className="my-6 border-[#D6C3AA]" />

          <div className="max-h-[500px] overflow-y-auto pr-2">
            <PostGrid />
          </div>
        </div>

        {editOpen && (
          <EditProfileDialog
            profile={profileData}
            onClose={handleSave}
          />
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
