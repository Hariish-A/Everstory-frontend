// src/pages/profile/components/EditProfileDialog.tsx
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useApiPost, useApiPut } from "@/hooks/useApi";
import { toast } from "react-hot-toast";

interface EditProfileDialogProps {
  profile?: any;
  onClose: () => void;
}

const defaultForm = {
  name: "",
  username: "",
  bio: "",
  // location: "",
  website: "",
  // birth_date: "",
  gender: "",
};

const EXCLUDED_KEYS = ["id", "profile_pic", "role"];

const EditProfileDialog = ({ profile, onClose }: EditProfileDialogProps) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (profile) {
      const filtered = Object.fromEntries(
        Object.entries(profile).filter(
          ([key]) => key in defaultForm && !EXCLUDED_KEYS.includes(key)
        )
      );
      setForm({ ...defaultForm, ...filtered });
    }
  }, [profile]);

  const { mutateAsync: createProfile } = useApiPost("http://localhost:8011/auth/me", {});
  const { mutateAsync: updateProfile } = useApiPut("http://localhost:8011/auth/me", {});

  const handleSave = async () => {
    try {
      if (!profile?.id) {
        await createProfile(form);
        toast.success("Profile created successfully");
      } else {
        await updateProfile(form);
        toast.success("Profile updated successfully");
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-[600px] max-w-full">
        <Dialog.Title className="text-xl font-bold text-[#614426] mb-4">
          Edit Profile
        </Dialog.Title>

        <div className="space-y-4 text-sm">
          {Object.entries(form).map(([key, val]) => (
            <div
              key={key}
              className="flex justify-between border-b py-2 capitalize"
            >
              <label className="text-gray-700">{key.replace("_", " ")}</label>
              <input
                className="text-right outline-none w-1/2 bg-transparent text-gray-800"
                value={val}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
