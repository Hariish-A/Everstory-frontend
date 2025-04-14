import React from "react";
import { PostType } from "@/types/post";
import "react-loading-skeleton/dist/skeleton.css";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 relative"
      style={{ width: "600px", height: "670px" }}
    >
      {/* Author */}
      <div className="flex items-center absolute top-6 left-12"> {/* adjust right to center with post image beginning */}
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="ml-3 ms-10">
          <h3 className="text-lg font-semibold">{post.author}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Image Frame */}
      {post.image && (
        <div
          className="bg-gray-200 rounded-lg overflow-hidden absolute"
          style={{
            top: "100px",
            left: "40px",
            right: "40px",
            bottom: "35px",
            height: "500px",
          }}
        >
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

    </div>
  );
};

export default Post;
