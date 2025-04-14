// src/pages/home/UserForYou.tsx

import { useEffect, useState, useRef, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./components/Post";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Searchbar";
import PostDialog from "./components/PostDialog";
import { PostType } from "@/types/post";
import bg from "@/assets/everstory-bg-plain.png";
import { Plus } from "lucide-react";
import PendingRequests from "./components/PendingRequests";
import axiosInstance from "@/api/client";

const UserForYou = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
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
      const res = await axiosInstance.get(
        `http://localhost:8021/posts/feed?skip=${page * 10}&limit=10`
      );
      const formattedPosts = res.map((p: any) => ({
        id: p.id,
        image: p.asset_url,
        content: "", // no content field in response
        author: `User ${p.user_id}`, // placeholder
        timestamp: new Date().toISOString(),
      }));
      setPosts((prev) => [...prev, ...formattedPosts]);
      setHasMore(res.length === 10);
    } catch (err) {
      console.error("Error fetching feed posts", err);
    } finally {
      setLoading(false);
    }
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
      <main className="flex-1 overflow-y-auto px-4 py-6 pl-[110px]">
        <div
          className="sticky top-7 z-10 flex items-center justify-between mb-6 pr-6"
          style={{ width: "100%", background: "transparent" }}
        >
          <div className="flex items-center gap-4" style={{ width: "600px" }}>
            <SearchBar />
            <button
              onClick={() => setShowDialog(true)}
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
        </div>

        {/* Posts */}
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

        <div className="absolute right-30 top-42">
          <PendingRequests />
        </div>

        {showDialog && <PostDialog onClose={() => setShowDialog(false)} />}
      </main>
    </div>
  );
};

export default UserForYou;
