import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "@/components/auth/InputField";
import axiosInstance from "@/api/client";
import Star from "@/components/ui/Star";
import logo from "@/assets/everstory-logo.png";

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [stars, setStars] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
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
      setError("Missing or invalid reset token.");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!token) {
      setError("No reset token found.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/auth/update-password", {
        access_token: token,
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{
        backgroundImage: "url('/src/assets/everstory-bg-plain.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Stars */}
      <div className="fixed top-0 left-0 w-full h-screen -rotate-45 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <Star key={star.id} {...star} />
        ))}
      </div>

      {/* Update Password Card - black */}
      <motion.div
        className="max-w-md w-full p-8 bg-black rounded-2xl shadow-2xl border border-gray-700 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Everstory Logo" className="w-32 h-32 object-contain" />
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Set New Password
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 mb-6 rounded-lg border border-red-500/50 text-sm text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/20 text-green-400 p-3 mb-6 rounded-lg border border-green-500/50 text-sm text-center">
            Password updated successfully. Redirecting to login...
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

            {/* Yellow update button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 disabled:opacity-50"
              disabled={loading || !token}
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
