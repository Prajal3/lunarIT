import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DoctorsSection from "../components/doctorinfo.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BreathingExercise from "../components/breathing.jsx";

const slides = [
  {
    type: "questions",
    title: "Your MentalHealth Matters",
    desc: "A simple check-in for your mental well-being.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
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
    color: "bg-[#7ab8ff] hover:bg-[#66a9f5]",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const isPaused = useRef(false);

  // Breathing popup state
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
    <div className="min-h-screen bg-linear-to-b from-[#eef7f4] to-[#f9fbfb] px-6 py-16">
      {/* SLIDER */}
      <div
        className="relative max-w-6xl mx-auto mb-28 overflow-hidden"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow hover:bg-white transition"
        >
          <ChevronLeft className="text-[#2f6f6a]" />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow hover:bg-white transition"
        >
          <ChevronRight className="text-[#2f6f6a]" />
        </button>

        {/* Slides */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-white rounded-3xl shadow-[0_12px_35px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* Image */}
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="h-72 w-full object-cover"
            />

            {/* Content */}
            <div className="p-10 flex flex-col justify-center items-center min-h-90">
              <h2 className="text-3xl font-semibold text-[#2f6f6a] mb-4 text-center">
                {slides[index].title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-xl text-center">
                {slides[index].desc}
              </p>

              {/* Breathing animation on slider */}
              {slides[index].type === "breathing" && (
                <div className="mb-10 relative flex justify-center items-center">
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute w-32 h-32 rounded-full bg-blue-300/30"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], y: [0, -10, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-24 h-24 rounded-full bg-blue-200/60 flex items-center justify-center relative z-10"
                  >
                    <span className="text-sm text-blue-700">breathe</span>
                  </motion.div>
                </div>
              )}

              {/* Button */}
              <button
                onClick={() => handleButtonClick(slides[index])}
                className={`${slides[index].color} text-white px-10 py-3 rounded-full transition`}
              >
                {slides[index].button}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-[#5fb3a2]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DOCTORS */}
      <DoctorsSection />

      {/* Breathing Exercise Popup */}
      <BreathingExercise
        isOpen={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />
    </div>
  );
};

export default Home;
