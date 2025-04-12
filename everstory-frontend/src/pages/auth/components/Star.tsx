import { motion } from "framer-motion";

interface StarProps {
  delay: number;
  duration: number;
  top: number;
  width: number;
}

const Star: React.FC<StarProps> = ({ delay, duration, top, width }) => (
  <motion.div
    className="absolute h-0.5 bg-white rounded-full opacity-60"
    style={{
      top: `${top}vh`,
      width: `${width}em`,
      filter: "drop-shadow(0 0 2px #ffffff)",
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
      className="absolute top-0 left-0 w-1 h-full bg-white rounded-full rotate-45"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div
      className="absolute top-0 left-0 w-1 h-full bg-white rounded-full -rotate-45"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

export default Star;
