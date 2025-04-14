// src/pages/profile/components/ProfileHeader.tsx
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { UserPlus, User } from "lucide-react";
import profilePic from "@/assets/profile-pic.jpg";


interface ProfileHeaderProps {
  onEdit: () => void;
  isCurrentUser: boolean;
  profile: any;
}

const ProfileHeader = ({ onEdit, isCurrentUser, profile }: ProfileHeaderProps) => {
  const { data: profilePicUrl } = useProfilePicture();

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex gap-6">
      <img
          src={profilePic}

          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        {profile ? (
          <div className="space-y-1 text-sm text-gray-700">
            <p>{profile.name}</p>
            <p>@{profile.username}</p>
            <p>{profile.website}</p>
            <p>{profile.location}</p>
            <p>{profile.birth_date}</p>
            <p>{profile.bio}</p>
          </div>
        ) : (
          <div className="italic text-gray-500 mt-2">No profile found.</div>
        )}
      </div>

      {isCurrentUser && (
        <button
          onClick={onEdit}
          className="bg-[#614426] text-white px-4 py-2 rounded-full hover:bg-[#4e331f] transition flex items-center gap-2"
        >
          {profile ? <User size={16} /> : <UserPlus size={16} />}
          {profile ? "Edit Profile" : "Create Profile"}
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
