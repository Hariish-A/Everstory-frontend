import { useState, useEffect } from "react";
import CarouselDialog from "./CarouselDialog";
import axiosInstance from "@/api/client";
import { toast } from "react-hot-toast";

interface Post {
  id: number;
  asset_url: string;
  is_private: boolean;
  type: string;
}

const PostGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8021/posts/me", {
        params: { skip: 0, limit: 10 },
      });
      setPosts(res);
    } catch (err) {
      toast.error("Failed to load your posts");
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mt-6">
        {posts.map((post, i) => (
          <img
            key={post.id}
            src={post.asset_url}
            alt={`Post ${i + 1}`}
            className="w-[200px] h-[200px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
            onClick={() => handleOpen(i)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <CarouselDialog
          initialIndex={selectedIndex}
          onClose={handleClose}
          posts={posts.map((post) => ({
            id: post.id,
            image: post.asset_url,
          }))}
        />
      )}
    </div>
  );
};

export default PostGrid;
