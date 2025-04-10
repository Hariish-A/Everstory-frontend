import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "@/components/auth/InputField";
import axiosInstance from "@/api/client";

interface StarProps {
  delay: number;
  duration: number;
  top: number;
  width: number;
}

const Star: React.FC<StarProps> = ({ delay, duration, top, width }) => (
  <motion.div
    className="absolute h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full opacity-70"
    style={{
      top: `${top}vh`,
      width: `${width}em`,
      filter: "drop-shadow(0 0 2px #4ade80)",
    }}
    initial={{ x: "100vw" }}
    animate={{ x: "-30vw" }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    }}
  >
    <motion.div
      className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-green-400 to-transparent rounded-full rotate-45"
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div
      className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-green-400 to-transparent rounded-full -rotate-45"
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [stars, setStars] = useState<StarProps[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 6,
      top: Math.random() * 100,
      width: Math.random() * 7.5 + 5,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      setError("Invalid or missing reset token. Please request a new reset link.");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("No token found.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/update-password", {
        access_token: token,
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d1d31] to-[#0c0d13] p-4 overflow-hidden relative">
      <div className="fixed top-0 left-0 w-full h-screen -rotate-45 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <Star key={i} {...star} />
        ))}
      </div>

      <motion.div
        className="max-w-md w-full p-8 bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/30 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-semibold mb-8 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-blue-400">
            Set New Password
          </span>
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 mb-6 rounded-lg border border-red-500/50">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/20 text-green-400 p-3 mb-6 rounded-lg border border-green-500/50">
            Password updated! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type="password"
              placeholder="New Password"
              icon="lock"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900/60 text-white border-gray-700"
            />
            <InputField
              type="password"
              placeholder="Confirm New Password"
              icon="lock"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-900/60 text-white border-gray-700"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-500/20 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <span className="ml-2">Updating...</span>
                </div>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
