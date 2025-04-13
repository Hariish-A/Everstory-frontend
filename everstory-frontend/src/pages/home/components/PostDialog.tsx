import React, { useState } from "react";
import { X } from "lucide-react";
import Switch from "./Switch";

interface PostDialogProps {
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[800px] h-[500px] flex relative overflow-hidden">
        <button className="absolute top-2 right-4 text-gray-600 hover:text-red-500" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Left Side - Image Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-1/2 flex items-center justify-center border-r border-gray-300 p-6"
        >
          <label className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-cover" />
            ) : (
              <span className="text-gray-500 text-center">Drag & drop or click to upload</span>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Right Side - Details */}
        <div className="w-1/2 p-6 flex flex-col gap-4 mt-[12px] justify-between">
          <textarea
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Switch onToggle={(isPrivate) => console.log("Private?", isPrivate)} />
          <button
            className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDialog;
