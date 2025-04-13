interface UserInfoProps {
    className?: string;
  }
  
  const UserInfo = ({ className = "" }: UserInfoProps) => {
    return (
      <div className={`flex absolute top-1 items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <span className="text-sm font-medium" style={{ color: "#614426" }}>
          User Name
        </span>
      </div>
    );
  };
  
  export default UserInfo;
  