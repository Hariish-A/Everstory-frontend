import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: "mail" | "lock" | "person";
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  icon,
  name,
  value,
  onChange,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  const getIcon = () => {
    switch (icon) {
      case "mail":
        return <HiOutlineMail className="w-5 h-5 text-emerald-400" />;
      case "lock":
        return <HiOutlineLockClosed className="w-5 h-5 text-emerald-400" />;
      case "person":
        return <HiOutlineMail className="w-5 h-5 text-emerald-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        {getIcon()}
      </span>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 pl-12 pr-12 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-400"
        >
          {showPassword ? (
            <HiOutlineEyeOff className="w-5 h-5" />
          ) : (
            <HiOutlineEye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
