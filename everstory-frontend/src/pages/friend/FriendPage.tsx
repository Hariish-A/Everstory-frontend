import Sidebar from "@/pages/home/components/Sidebar";
import FriendList from "@/pages/friend/components/FriendList";
import SearchBar from "@/pages/friend/components/Searchbar";
import UserInfo from "@/pages/home/components/UserInfo";
import bg from "@/assets/everstory-bg-plain.png";

const FriendPage = () => {
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

      {/* Content area */}
      <main className="flex-1 px-6 pt-13 mt-[1px] pl-[110px]">
        <div>
          {/* Static search bar section */}
          <div className="sticky top-2 z-10">
            <SearchBar />
            {/* <UserInfo className="right-57" /> */}
            </div>

          {/* Friends card below */}
          <div className="mt-14">
            <div className="w-[400px] bg-[#FAF3E0] rounded-xl shadow-lg p-6">

              <FriendList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendPage;
