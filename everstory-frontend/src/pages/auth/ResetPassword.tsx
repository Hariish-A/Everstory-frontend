import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InputField from "../../components/auth/InputField";
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

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 6,
      top: Math.random() * 100,
      width: Math.random() * 7.5 + 5,
    }));
    setStars(newStars);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await axiosInstance.post("/auth/reset-password", { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Something went wrong. Try again.");
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
            Reset Your Password
          </span>
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 mb-6 rounded-lg border border-red-500/50">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/20 text-green-400 p-3 mb-6 rounded-lg border border-green-500/50">
            Password reset email sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type="email"
              placeholder="Enter your email"
              icon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                  <span className="ml-2">Sending...</span>
                </div>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-gray-400">
          Back to{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
