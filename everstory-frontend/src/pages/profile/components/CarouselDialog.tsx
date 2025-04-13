import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Dialog } from "@headlessui/react";

interface CarouselDialogProps {
  onClose: () => void;
  initialIndex: number;
  posts: { id: number; image: string }[];
}

const CarouselDialog = ({ onClose, posts, initialIndex }: CarouselDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activePosts, setActivePosts] = useState(posts);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activePosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activePosts.length) % activePosts.length);
  };

  const handleDelete = () => {
    const updated = activePosts.filter((_, i) => i !== currentIndex);
    if (updated.length === 0) {
      onClose();
    } else {
      setActivePosts(updated);
      setCurrentIndex((prev) => Math.min(prev, updated.length - 1));
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded-xl w-[600px] max-w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <X size={24} />
        </button>

        {activePosts.length > 0 ? (
          <>
            <div className="flex justify-center items-center mb-4">
              <img
                src={activePosts[currentIndex].image}
                alt="Current Post"
                className="w-[500px] h-[500px] object-cover rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handlePrev} className="text-[#614426] font-semibold">
                ⟵ Prev
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete Post
              </button>
              <button onClick={handleNext} className="text-[#614426] font-semibold">
                Next ⟶
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No posts left.</p>
        )}
      </div>
    </Dialog>
  );
};

export default CarouselDialog;
