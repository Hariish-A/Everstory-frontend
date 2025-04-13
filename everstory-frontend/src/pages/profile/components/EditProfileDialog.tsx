import { Dialog } from "@headlessui/react";
import ProfileCard from "./ProfileCard";

interface EditProfileDialogProps {
  onClose: () => void;
}

const EditProfileDialog = ({ onClose }: EditProfileDialogProps) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded-xl w-[700px] max-w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <ProfileCard />
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
