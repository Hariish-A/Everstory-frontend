interface FriendCardProps {
    name: string;
  }
  
  const FriendCard = ({ name }: FriendCardProps) => {
    const handleClick = () => {
      console.log(`Clicked on ${name}`);
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
  