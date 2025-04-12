import { useEffect, useState, useRef, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./components/Post";
import { PostType } from "../../types/post";

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
          author: "User",
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
    <div className="max-w-md mx-auto p-4">
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : undefined}
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
                  <Skeleton circle width={40} height={40} />
                  <div className="ml-3">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={80} height={16} />
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
  );
};

export default UserForYou;
