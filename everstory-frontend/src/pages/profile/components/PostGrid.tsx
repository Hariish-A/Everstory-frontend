import { useState } from "react";
import CarouselDialog from "./CarouselDialog";

const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `https://placehold.co/300x300?text=Post+${i + 1}`,
}));

const PostGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mt-6">
        {mockPosts.map((post, i) => (
          <img
            key={post.id}
            src={post.image}
            alt={`Post ${post.id}`}
            className="w-[200px] h-[200px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
            onClick={() => handleOpen(i)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <CarouselDialog
          initialIndex={selectedIndex}
          onClose={handleClose}
          posts={mockPosts}
        />
      )}
    </div>
  );
};

export default PostGrid;
