import React from "react";
import { PostType } from "../../../types/post";
import "react-loading-skeleton/dist/skeleton.css";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="ml-3">
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      {post.image && (
        <div className="w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-gray-800">{post.content}</p>
    </div>
  );
};

export default Post;
