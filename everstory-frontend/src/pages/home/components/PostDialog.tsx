import React, { useState } from "react";
import { X } from "lucide-react";
import Switch from "./Switch";
import axiosInstance from "@/api/client";
import { toast } from "react-hot-toast";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dioah7pig/image/upload";

interface PostDialogProps {
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ onClose }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setUploading(true);

      // Step 1: Get upload config from backend
      const response = await axiosInstance.post("http://localhost:8021/posts/create", {
        is_private: isPrivate,
        type: "POST",
      });

      const { post_id, public_id, upload_preset } = response;

      // Step 2: Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", upload_preset); // Example: "everstory"
      formData.append("public_id", public_id); // Example: "post_101"

      const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");
      const result = await cloudRes.json();

      toast.success("Post uploaded ✅");
      onClose();
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error("Upload failed. Check logs.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[800px] h-[500px] flex relative overflow-hidden">
        <button
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
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
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-full max-w-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-center">Drag & drop or click to upload</span>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Right Side - Options */}
        <div className="w-1/2 p-6 flex flex-col gap-6 justify-between mt-[12px]">
          <Switch onToggle={(val) => setIsPrivate(val)} />
          <button
            className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePost}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDialog;
