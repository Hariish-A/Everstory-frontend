import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  FileText,
  Folder,
  Brain,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

const OnboardingPage = () => {
  type SignupForm = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupForm) => {
    console.log(data);
    // Handle form submission
  };
  // Animation Variants
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden">
      {/* Blob Background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lime-200 rounded-full opacity-20 animate-blob" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full opacity-20 animate-blob animation-delay-2000" />

      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 bg-white rounded-lg shadow-md p-8 max-w-md w-full mb-8"
      >
        <motion.h1
          variants={heroVariants}
          className="text-4xl font-bold text-blue-700 mb-2"
        >
          Welcome Rockstar!
        </motion.h1>
        <motion.p variants={heroVariants} className="text-gray-600 mb-6">
          Sign up to unlock a smarter way to study with friends.
        </motion.p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={heroVariants}>
            <div
              className="flex items-center border border-blue-500 rounded-lg
              p-2"
            >
              <Mail className="w-6 h-6 text-blue-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-gray-700"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>
          <motion.div variants={heroVariants}>
            <div
              className="flex items-center border border-blue-500 rounded-lg
              p-2"
            >
              <Lock className="w-6 h-6 text-blue-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-gray-700"
                {...register("password")}
              />
              {showPassword ? (
                <Eye
                  className="w-6 h-6 text-gray-500 cursor-pointer ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  className="w-6 h-6 text-gray-500 cursor-pointer ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>
          <motion.button
            type="submit"
            variants={heroVariants}
            className="w-full bg-lime-500 text-white py-2 rounded-lg font-semibold hover:bg-lime-600 transition"
            whileHover={{ boxShadow: "0 0 15px rgba(132, 204, 22, 0.5)" }}
          >
            Sign Up
          </motion.button>
          <motion.button
            variants={heroVariants}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center font-semibold hover:bg-gray-300 transition"
          >
            <LogIn className="w-5 h-5 mr-2" /> Sign in with Google
          </motion.button>
          <p className="text-gray-600 mt-4 w-full text-center">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </motion.section>

      {/* Feature Steps */}
      <section className="relative z-10 max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <FileText className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Collaborate Live
            </h3>
            <p className="text-gray-600 mb-4">
              Edit notes and brainstorm together in real time.
            </p>
            <ArrowRight className="w-6 h-6 text-lime-500" />
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <Folder className="w-12 h-12 text-lime-500 mb-4" />
            <h3 className="text-xl font-semibold text-lime-700 mb-2">
              Stay Organized
            </h3>
            <p className="text-gray-600 mb-4">
              Keep all your study materials in one place.
            </p>
            <ArrowRight className="w-6 h-6 text-lime-500" />
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <Brain className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Learn Smarter
            </h3>
            <p className="text-gray-600 mb-4">
              Get AI-powered summaries and tips.
            </p>
            <ArrowRight className="w-6 h-6 text-lime-500" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingPage;