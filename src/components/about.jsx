import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-gray-800 mb-6 text-center"
      >
        About MindSpace
      </motion.h2>

      {/* Main Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl p-8 shadow-lg space-y-6"
      >
        {/* Mission */}
        <motion.section variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            MindSpace aims to create a calm and supportive digital space where
            users can reflect on their emotions and mental state. Our goal is to
            promote self-awareness and emotional check-ins in a simple,
            pressure-free way.
          </p>
        </motion.section>

        {/* What We Offer */}
        <motion.section variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            What We Provide
          </h3>
          <p className="text-gray-600 leading-relaxed">
            MindSpace offers surface-level mental health tools such as reflective, breathing exercises, and general
            self-care guidance. These features are designed to help users stay
            mindful of their wellbeing, not to diagnose or treat mental health
            conditions.
          </p>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          variants={itemVariants}
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Important Disclaimer
          </h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-gray-700 leading-relaxed">
              MindSpace does not provide medical advice, therapy, or crisis
              intervention. It only covers the surface layer of mental health
              awareness. If you are facing severe stress, depression, or thoughts
              of self-harm, please seek help from a licensed mental health
              professional or contact local emergency services immediately.
            </p>
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Privacy & Safety
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your data stays yours. MindSpace focuses on privacy-first design,
            ensuring your mood entries and reflections remain secure and are
            never shared without your consent.
          </p>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default About;
