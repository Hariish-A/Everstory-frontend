import { useState } from "react";

interface SwitchProps {
  onToggle?: (isPrivate: boolean) => void;
}

const Switch = ({ onToggle }: SwitchProps) => {
  const [isPrivate, setIsPrivate] = useState(false);

  const toggle = () => {
    setIsPrivate((prev) => {
      const newState = !prev;
      if (onToggle) onToggle(newState);
      return newState;
    });
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <span className="text-sm font-semibold text-[#614426]">
        {isPrivate ? "Private" : "Public"}
      </span>
      <div
        onClick={toggle}
        className={`w-16 h-9 rounded-full p-1 cursor-pointer flex items-center transition-all duration-300 ${
          isPrivate ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <div
          className={`w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isPrivate ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Switch;
