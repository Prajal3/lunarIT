import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DoctorsSection from "../components/doctorinfo.jsx";
import { ChevronLeft, ChevronRight, Brain, Wind } from "lucide-react";
import BreathingExercise from "../components/breathing.jsx";
import Motivation from "../components/Motivation.jsx";

const slides = [
  {
    type: "questions",
    title: "Your Mental Health Matters",
    desc: "A simple check-in for your mental well-being.",
    button: "Start check-in",
    route: "/questions",
    color: "bg-[#5fb3a2] hover:bg-[#4aa292]",
  },
  {
    type: "breathing",
    title: "Calm Your Breath",
    desc: "Slow breathing to relax the nervous system and release stress.",
    button: "Start Breathing",
    route: "/breathing",
    color: "bg-[#7fd1c3] hover:bg-[#5fb3a2]",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const isPaused = useRef(false);
  const [breathingOpen, setBreathingOpen] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const next = () => {
    isPaused.current = true;
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    isPaused.current = true;
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleButtonClick = (slide) => {
    if (slide.type === "breathing") {
      setBreathingOpen(true);
    } else {
      navigate(slide.route);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e3f4f0] via-[#f5faf8] to-[#e8f6f3] px-6 py-16 relative overflow-hidden">
      {/* Floating decorative background elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-64 h-64 bg-linear-to-br from-[#5fb3a2]/10 to-[#7fd1c3]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-linear-to-br from-[#7fd1c3]/10 to-[#5fb3a2]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5fb3a2]/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-lg mb-6 border border-white/40"
        >
        
          <span className="text-[#2f6f6a] font-semibold">Welcome to Your MenatlSpace</span>
          
        </motion.div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2f6f6a] mb-5 tracking-tight">
          Take Care of <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5fb3a2] to-[#7fd1c3]">You</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Your mental wellness journey starts here. Explore tools designed to support your peace of mind.
        </p>
      </motion.div>

      {/* SLIDER + MOTIVATION */}
      <div className="max-w-6xl mx-auto mb-28 flex flex-col lg:flex-row gap-8 relative z-10">
        {/* SLIDER */}
        <div
          className="relative flex-1 overflow-visible"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {/* Arrows */}
          <motion.button
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:shadow-[#5fb3a2]/20 hover:shadow-2xl border-2 border-[#5fb3a2]/20 transition-all"
          >
            <ChevronLeft className="text-[#2f6f6a]" size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:shadow-[#5fb3a2]/20 hover:shadow-2xl border-2 border-[#5fb3a2]/20 transition-all"
          >
            <ChevronRight className="text-[#2f6f6a]" size={24} />
          </motion.button>

          {/* Slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60, rotateY: 5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -60, rotateY: -5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-linear-to-br from-white via-white to-[#e8f6f3]/30 rounded-4xl shadow-2xl p-14 text-center relative overflow-hidden border border-white/50"
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-[#5fb3a2]/10 to-transparent rounded-bl-[3rem]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-[#7fd1c3]/10 to-transparent rounded-tr-[3rem]" />
              
              {/* Animated gradient orbs */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-[#5fb3a2]/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#7fd1c3]/20 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                {/* ICON AREA */}
                {slides[index].type === "questions" && (
                  <div className="mb-10 flex justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.4, 0, 0.4]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 bg-[#5fb3a2] rounded-full blur-2xl"
                      />
                      {/* Middle ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-linear-to-br from-[#5fb3a2] to-[#7fd1c3] rounded-full blur-xl"
                      />
                      {/* Icon container */}
                      <div className="relative p-12 rounded-full bg-linear-to-br from-[#e8f6f3] via-[#d4ebe7] to-[#e8f6f3] shadow-xl">
                        <Brain size={72} className="text-[#5fb3a2]" />
                      </div>
                    </motion.div>
                  </div>
                )}

                {slides[index].type === "breathing" && (
                  <div className="mb-12 flex justify-center items-center relative h-52">
                    {/* Outermost rotating ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 2.4, 1], 
                        opacity: [0.5, 0, 0.5],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute w-32 h-32 rounded-full border-[3px] border-dashed border-[#5fb3a2]/40"
                    />
                    
                    {/* Second ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 2, 1], 
                        opacity: [0.4, 0, 0.4],
                        rotate: [360, 0]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-36 h-36 rounded-full border-2 border-[#7fd1c3]/30"
                    />
                    
                    {/* Middle pulse */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.7, 1],
                        opacity: [0.6, 0.2, 0.6]
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="absolute w-40 h-40 rounded-full bg-linear-to-br from-[#7fd1c3]/20 to-[#5fb3a2]/20 blur-md"
                    />

                    {/* Inner breathing circle */}
                    <motion.div
                      animate={{ scale: [1, 1.35, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-36 h-36 rounded-full bg-linear-to-br from-[#7fd1c3] via-[#6bc4b5] to-[#5fb3a2] flex items-center justify-center z-10 shadow-2xl relative"
                    >
                      <Wind className="text-white absolute" size={44} />
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-white/20"
                      />
                    </motion.div>
                  </div>
                )}

                {/* TEXT */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl lg:text-5xl font-bold text-[#2f6f6a] mb-5 tracking-tight"
                >
                  {slides[index].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
                >
                  {slides[index].desc}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleButtonClick(slides[index])}
                  className={`${slides[index].color} text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group`}
                >
                  <span className="relative z-10">{slides[index].button}</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  isPaused.current = true;
                  setIndex(i);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === index 
                    ? "w-12 bg-linear-to-r from-[#5fb3a2] to-[#7fd1c3] shadow-lg" 
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MOTIVATION PHRASES */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex flex-1 bg-linear-to-br from-white to-[#e8f6f3]/50 rounded-4xl shadow-2xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-[#5fb3a2]/10 to-transparent rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-tr from-[#7fd1c3]/10 to-transparent rounded-full blur-2xl"
          />
          
          <div className="relative z-10 w-full">
            <Motivation />
          </div>
        </motion.div>
      </div>

      {/* Doctors Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10"
      >
        <DoctorsSection />
      </motion.div>

      {/* Breathing Exercise Popup */}
      <BreathingExercise
        isOpen={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />
    </div>
  );
};

export default Home;