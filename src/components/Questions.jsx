import { motion } from "framer-motion";

const Questions = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl max-w-xl w-full text-center shadow-xl"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          How Are You Feeling Today?
        </h1>

        <p className="text-gray-700 mb-6">
          Take a moment to reflect. Your mental health matters, and it's okay to
          feel what you’re feeling.
        </p>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium"
          >
            I feel calm 🙂
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-lg bg-yellow-500 text-white font-medium"
          >
            I feel anxious 😟
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-lg bg-red-500 text-white font-medium"
          >
            I feel stressed 😣
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Questions;
