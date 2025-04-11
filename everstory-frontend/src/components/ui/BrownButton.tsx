interface Props {
    children: React.ReactNode;
    onClick: () => void;
  }
  
  const BrownButton: React.FC<Props> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="bg-[#8B4513] text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-[#A0522D] transition"
    >
      {children}
    </button>
  );
  
  export default BrownButton;
  