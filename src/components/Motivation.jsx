import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Motivation = () => {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    // Simulate AI-generated phrases (replace this with actual AI API call if needed)
    const generateMotivation = async () => {
      // Example: using static AI-generated phrases for demonstration
      const aiPhrases = [
        "You are capable of amazing things!",
        "Focus on progress, not perfection.",
        "Embrace challenges as growth opportunities.",
        "Keep pushing forward, no matter what.",
        "Your effort today shapes your tomorrow."
      ];
      setPhrases(aiPhrases);
    };

    generateMotivation();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start p-6 max-w-sm">
      <h3 className="text-2xl font-semibold text-[#2f6f6a] mb-4">
        Daily Motivation
      </h3>
      {phrases.map((phrase, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, duration: 0.6 }}
          className="text-gray-700 mb-3 text-lg"
        >
          {phrase}
        </motion.p>
      ))}
    </div>
  );
};

export default Motivation;
