import { useState } from "react";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  onEdit: () => void;
  isCurrentUser: boolean;
}

const ProfileHeader = ({ onEdit, isCurrentUser }: ProfileHeaderProps) => {
  const [profile] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    website: "https://example.com",
    gender: "Male",
    bio: "I love sharing moments through Everstory.",
    profile_pic: "https://placehold.co/100x100",
  });

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex gap-6">
        <img
          src={profile.profile_pic}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="space-y-1 text-sm text-gray-700">
          <p>{profile.name}</p>
          <p>@{profile.username}</p>
          <p>{profile.website}</p>
          <p>{profile.bio}</p>
        </div>
      </div>
      {isCurrentUser && (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-[#614426] text-white px-3 py-1.5 text-sm rounded-full hover:bg-[#4e331f] transition"
        >
          <User size={14} />
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
