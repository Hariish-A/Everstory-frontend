import { motion } from "framer-motion";
import logo from "../../assets/everstory-logo.png";

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col">
      <motion.img
        src={logo}
        alt="Everstory Logo"
        className="w-32 h-32 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="w-8 h-8 border-4 border-brown-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default SplashScreen;
