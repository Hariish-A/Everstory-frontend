import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "@/pages/auth/components/InputField";
import SocialLogin from "@/pages/auth/components/SocialLogin";
import Star from "@/pages/auth/components/Star";
import logo from "@/assets/everstory-logo-white.png";
import { useApiPost } from "@/hooks/useApi";
import toast from "react-hot-toast";


const HomePage = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    mutate: login,
    isPending,
  } = useApiPost("http://localhost:8011/auth/login", {
    onSuccess: (data: any) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      toast.success("Login successful!");
      navigate("/for-you");
    },
    
    // In onError
    onError: (err: any) => {
      const msg = err?.response?.data?.detail;
      toast.error(
        Array.isArray(msg)
          ? msg.map((e: any) => `${e.loc.join(".")}: ${e.msg}`).join(", ")
          : msg || "Login failed."
      );
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    login({ email, password });
  };

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

      {/* Login Card */}
      <motion.div
        className="max-w-md w-full p-8 bg-black rounded-2xl shadow-2xl border border-gray-700 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Everstory Logo" className="w-32 h-32 object-contain" />
        </div>

        <SocialLogin />

        <div className="relative my-8 text-center">
          <span className="relative z-10 px-4 text-gray-300 font-medium">or</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email address"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900/60 text-white border-gray-700"
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-900/60 text-white border-gray-700"
          />

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}

          <Link
            to="/reset-password"
            className="block text-white hover:text-gray-300 text-sm text-center transition"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <span className="ml-2">Logging In...</span>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="hover:text-gray-300 font-medium transition">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
