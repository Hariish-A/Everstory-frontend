import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "@/api/client";
import InputField from "@/components/auth/InputField";
import SocialLogin from "@/components/auth/SocialLogin";

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

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<StarProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 6,
      top: Math.random() * 100,
      width: Math.random() * 7.5 + 5,
    }));
    setStars(newStars);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { first_name, last_name, email, password } = formData;
    if (!first_name || !last_name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      navigate("/login");
    } catch (err: any) {
      const msg = err?.response?.data?.detail;
      setError(Array.isArray(msg) ? msg.map((e: any) => `${e.loc.join(".")}: ${e.msg}`).join(", ") : msg || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d1d31] to-[#0c0d13] p-4 overflow-hidden relative">
      {/* Stars */}
      <div className="fixed top-0 left-0 w-full h-screen -rotate-45 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <Star key={i} {...star} />
        ))}
      </div>

      {/* Card */}
      <motion.div
        className="max-w-md w-full p-8 bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/30 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-semibold mb-8 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-blue-400">
            Sign Up for Everstory
          </span>
        </h2>

        <SocialLogin />

        <div className="relative my-8 text-center">
          <span className="relative z-10 px-4 text-gray-300 font-medium">or</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="text"
            placeholder="First name"
            icon="person"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="bg-gray-900/60 text-white border-gray-700"
          />
          <InputField
            type="text"
            placeholder="Last name"
            icon="person"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="bg-gray-900/60 text-white border-gray-700"
          />
          <InputField
            type="email"
            placeholder="Email address"
            icon="mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900/60 text-white border-gray-700"
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-900/60 text-white border-gray-700"
          />

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}

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
                <span className="ml-2">Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
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

export default Signup;
