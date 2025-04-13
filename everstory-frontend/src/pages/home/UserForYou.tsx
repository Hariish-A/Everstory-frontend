import { useEffect, useState, useRef, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./components/Post";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Searchbar";
import UserInfo from "./components/UserInfo";
import { PostType } from "@/types/post";
import bg from "@/assets/everstory-bg-plain.png";
import { Plus } from "lucide-react";
import PendingRequests from "./components/PendingRequests";

const UserForYou = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newPosts = Array(10)
        .fill(null)
        .map((_, index) => ({
          id: posts.length + index + 1,
          image: "https://placehold.co/400x400",
          content: `Post ${posts.length + index + 1}`,
          author: `User ${index + 1}`,
          timestamp: new Date().toISOString(),
        }));

      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(page < 5);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

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

      {/* Main scrollable feed */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pl-[110px]">
        {/* Top Bar */}
        <div
          className="sticky top-7 z-10 flex items-center justify-between mb-6 pr-6"
          style={{ width: "100%", background: "transparent" }}
        >
          {/* Search + Post */}
          <div className="flex items-center gap-4" style={{ width: "600px" }}>
            <SearchBar />
            <button
              className="flex items-center align-middle justify-center bg-[#F1E7D9] text-black font-semibold px-4"
              style={{
                borderRadius: "28px",
                height: "48px",
                width: "100px",
              }}
            >
              <Plus height={16} className="mt-0.5" />
              <span>Post</span>
            </button>
          </div>

          {/* User Info */}
          <UserInfo className="right-59" />
          </div>

        {/* Post List */}
        <div className="flex">
          <div className="space-y-[51px] w-3/5">
            {posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? lastPostRef : undefined}
                className={index === 0 ? "mt-[70px]" : ""}
              >
                <Post post={post} />
              </div>
            ))}

            {loading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white p-4 rounded-lg shadow space-y-4"
                  >
                    <div className="flex items-center">
                      <Skeleton circle width={48} height={48} />
                      <div className="ml-3">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={100} height={16} />
                      </div>
                    </div>
                    <Skeleton height={600} className="rounded-lg" />
                    <Skeleton height={40} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Requests */}
        <div className="absolute right-30 top-42">
          <PendingRequests />
        </div>
      </main>
    </div>
  );
};

export default UserForYou;
