// src/pages/profile/components/UploadProfilePicDialog.tsx
import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import { useUpdateProfilePic } from "@/hooks/useProfilePicture";
import { toast } from "react-hot-toast";

interface Props {
  onClose: () => void;
  onSuccess: (url: string) => void;
}

const UploadProfilePicDialog = ({ onClose, onSuccess }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync } = useUpdateProfilePic();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // your Cloudinary preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/demo/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const uploadedUrl = data.secure_url;

      await mutateAsync(uploadedUrl);
      toast.success("Profile picture updated!");
      onSuccess(uploadedUrl);
      onClose();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] max-w-full space-y-4 relative">
        <Dialog.Title className="text-lg font-bold text-[#614426]">Upload Profile Picture</Dialog.Title>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
        />

        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-60 border-2 border-dashed rounded-md flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50"
        >
          {preview ? <img src={preview} className="h-full object-cover rounded-md" /> : "Click or Drag to Upload"}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadProfilePicDialog;
