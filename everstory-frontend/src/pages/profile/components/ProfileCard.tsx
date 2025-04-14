import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Dialog } from "@headlessui/react";
import axiosInstance from "@/api/client";
import { toast } from "react-hot-toast";

const ProfileCard = () => {
  const [form, setForm] = useState({
    name: "Your name",
    username: "yourname",
    email: "yourname@gmail.com",
    website: "https://yourwebsite.com",
    gender: "Not specified",
    bio: "This is a short bio about yourself.",
  });

  const [profilePic, setProfilePic] = useState("https://placehold.co/80x80");
  const [openDialog, setOpenDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProfilePic = async () => {
    try {
      const { url } = await axiosInstance.get("/auth/me/pfp");
      setProfilePic(url);
    } catch {
      // fallback remains
    }
  };

  const uploadProfilePic = async () => {
    if (!imageFile) return;

    try {
      const { upload_url, key } = await axiosInstance.get("/auth/me/pfp");

      await fetch(upload_url, {
        method: "PUT",
        body: imageFile,
        headers: {
          "Content-Type": imageFile.type,
        },
      });

      await axiosInstance.put("/auth/me/pfp", { key });
      toast.success("Profile picture updated");
      setOpenDialog(false);
      fetchProfilePic();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (accepted) => setImageFile(accepted[0]),
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          {/* Clickable avatar */}
          <div
            className="relative w-20 h-20 cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            <img
              src={profilePic}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full">
              <Pencil size={14} className="text-gray-600" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-4 text-sm">
          {(["Name", "Username", "Email", "Website", "Gender", "Bio"] as const).map((label) => {
            const key = label.toLowerCase() as keyof typeof form;
            return (
              <div key={label} className="flex justify-between border-b py-2">
                <label className="text-gray-700">{label}</label>
                <input
                  className="text-right outline-none w-1/2 bg-transparent text-gray-800"
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      </div>

      {/* Dialog for profile pic upload */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div className="bg-white p-6 rounded-xl w-[500px] max-w-full">
          <Dialog.Title className="text-lg font-semibold mb-4 text-center">
            Upload New Profile Picture
          </Dialog.Title>

          <div
            {...getRootProps()}
            className="border border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop your image here...</p>
            ) : imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                className="mx-auto h-48 object-cover"
              />
            ) : (
              <p>Drag and drop image or click to select</p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={uploadProfilePic}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={!imageFile}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileCard;
