import { motion, Variants } from "framer-motion";
import {
  FileText,
  PenTool,
  MessageSquare,
  Folder,
  Calendar,
  Brain,
} from "lucide-react";

const LandingPage = () => {
  // Animation Variants
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="font-sans relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-semibold mb-4"
          >
            Study Smarter,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 from-30% to-lime-300">
              Together.
            </span>
          </motion.h1>
          <motion.p
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-blue-100"
          >
            Collaborate in real-time, ace your exams, and make learning fun.
          </motion.p>
          <motion.button
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-lime-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-lime-600 transition"
            whileHover={{ boxShadow: "0 0 15px rgba(132, 204, 22, 0.5)" }}
          >
            Get Started Free
          </motion.button>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-20 bg-gray-100 relative">
        <PenTool className="absolute top-10 right-20 text-blue-400 w-8 h-8 opacity-70" />
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Succeed
          </h2>
          <div>
            <h3 className="text-lg text-gray-900 mb-12">
              Ever wanted a single solution for all your study needs? Tired of
              using different apps for different tasks? We are students too, and
              we know how frustrating it is to manage your study materials and
              tasks. {"<App Name>"} will help you keep track of all your notes,
              textbooks, and even answer questions for you!
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Real-Time Note Sharing"
              desc="Annotate PDFs and slides together, instantly."
              color="blue"
              variants={featureVariants}
              icon={<FileText className={`w-6 h-6 text-blue-700`} />}
            />
            <FeatureCard
              title="Interactive Whiteboard"
              desc="Brainstorm and draw ideas in real time."
              color="lime"
              variants={featureVariants}
              icon={<PenTool className={`w-6 h-6 text-lime-700`} />}
            />
            <FeatureCard
              title="Group Chat & Video"
              desc="Stay connected with voice, video, and text."
              color="purple"
              variants={featureVariants}
              icon={<MessageSquare className={`w-6 h-6 text-purple-700`} />}
            />
            <FeatureCard
              title="Resource Library"
              desc="Store and organize all your study materials."
              color="blue"
              variants={featureVariants}
              icon={<Folder className={`w-6 h-6 text-blue-700`} />}
            />
            <FeatureCard
              title="Task Management"
              desc="Plan study sessions and track progress."
              color="lime"
              variants={featureVariants}
              icon={<Calendar className={`w-6 h-6 text-lime-700`} />}
            />
            <FeatureCard
              title="AI-Powered Assistance"
              desc="Get smart summaries and study tips."
              color="purple"
              variants={featureVariants}
              icon={<Brain className={`w-6 h-6 text-purple-700`} />}
            />
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-gray-900 text-white relative">
        {/* Static Lucide Icons */}
        <Folder className="absolute top-20 left-10 text-lime-400 w-8 h-8 opacity-70" />
        <MessageSquare className="absolute bottom-40 right-10 text-purple-400 w-8 h-8 opacity-70" />

        <div className="max-w-7xl mx-auto px-4">
          {/* Feature 1: Real-Time Note Sharing */}
          <div className="flex flex-col md:flex-row items-center mb-20 relative">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h3 className="text-3xl font-bold text-blue-400 mb-4">
                Real-Time Note Sharing
              </h3>
              <p className="text-gray-300">
                Highlight, comment, and edit lecture notes with your study group
                in real time.
              </p>
            </motion.div>
            <motion.div
              variants={shapeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center relative"
            >
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-80" />
                <div className="absolute inset-4 bg-blue-300 rounded-lg flex items-center justify-center text-white font-bold">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mb-2 mx-auto" />
                    <span>Demo Coming Soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2: Interactive Whiteboard */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20 relative">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h3 className="text-3xl font-bold text-lime-400 mb-4">
                Interactive Whiteboard
              </h3>
              <p className="text-gray-300">
                Brainstorm and draw ideas with your team in real time.
              </p>
            </motion.div>
            <motion.div
              variants={shapeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center relative"
            >
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-lime-500 rounded-lg opacity-80" />
                <div className="absolute inset-4 bg-lime-300 rounded-lg flex items-center justify-center text-white font-bold">
                  <div className="text-center">
                    <PenTool className="w-12 h-12 mb-2 mx-auto" />
                    <span>Demo Coming Soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 3: AI-Powered Assistance */}
          <div className="flex flex-col md:flex-row items-center relative">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h3 className="text-3xl font-bold text-purple-400 mb-4">
                AI-Powered Assistance
              </h3>
              <p className="text-gray-300">
                Get summaries, flashcards, and personalized tips from our smart
                AI tutor.
              </p>
            </motion.div>
            <motion.div
              variants={shapeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center relative"
            >
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-purple-500 rounded-lg opacity-80" />
                <div className="absolute inset-4 bg-purple-300 rounded-lg flex items-center justify-center text-white font-bold">
                  <div className="text-center">
                    <Brain className="w-12 h-12 mb-2 mx-auto" />
                    <span>Demo Coming Soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <motion.div
        className="fixed bottom-5 right-5 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button className="bg-lime-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-600 transition">
          Try Now
        </button>
      </motion.div>
    </div>
  );
};

// Updated Feature Card Component
const FeatureCard = ({
  title,
  desc,
  color,
  variants,
  icon,
}: {
  title: string;
  desc: string;
  color: string;
  variants: Variants;
  icon: any;
}) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={`p-6 rounded-lg shadow-md bg-white flex items-start space-x-4`}
  >
    <div>
      <div className="flex items-center gap-2 align-middle mb-2">
        {icon}
        <h3 className={`text-xl font-semibold text-${color}-700`}>{title}</h3>
      </div>
      <p className="text-gray-600">{desc}</p>
    </div>
  </motion.div>
);

export default LandingPage;