import FriendCard from "./FriendCard";

const friends = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Friend ${i + 1}`,
}));

const FriendList = () => {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {friends.map((friend) => (
        <FriendCard key={friend.id} name={friend.name} />
      ))}
    </div>
  );
};

export default FriendList;
