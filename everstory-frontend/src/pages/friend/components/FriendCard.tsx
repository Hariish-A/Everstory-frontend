// src/pages/friend/components/FriendCard.tsx
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  name: string;
  username: string;
}

const FriendCard = ({ name, username }: FriendCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white px-4 py-3 rounded-md shadow cursor-pointer hover:bg-[#fff7d6] transition"
    >
      {name}
    </div>
  );
};

export default FriendCard;
