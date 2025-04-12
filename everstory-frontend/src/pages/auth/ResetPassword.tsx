import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "@/pages/auth/components/InputField";
import axiosInstance from "@/api/client";
import Star from "@/pages/auth/components/Star";
import logo from "@/assets/everstory-logo-white.png";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 6,
      top: Math.random() * 100,
      width: Math.random() * 7.5 + 5,
    }));
    setStars(generatedStars);
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

      {/* Reset Card - black */}
      <motion.div
        className="max-w-md w-full p-8 bg-black rounded-2xl shadow-2xl border border-gray-700 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Everstory Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Reset Your Password
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 mb-6 rounded-lg border border-red-500/50 text-sm text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/20 text-green-400 p-3 mb-6 rounded-lg border border-green-500/50 text-sm text-center">
            Password reset email sent.
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

            {/* Yellow reset button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                  <span className="ml-2">Sending...</span>
                </div>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-white">
          Back to{" "}
          <Link
            to="/login"
            className="hover:text-gray-300 font-medium transition-colors duration-300"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
