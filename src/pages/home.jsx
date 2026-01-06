import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import DoctorsSection from "../components/doctorinfo.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    type: "questions",
    title: "Reflect & Understand",
    desc: "A gentle space to reflect on thoughts and emotions without pressure.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    button: "Begin Reflection",
    route: "/questions",
    color: "bg-[#5fb3a2] hover:bg-[#4aa292]",
  },
  {
    type: "breathing",
    title: "Calm Your Breath",
    desc: "Slow breathing to relax the nervous system and release stress.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
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

  return (
    <div className="min-h-screen bg-linear-to-b from-[#eef7f4] to-[#f9fbfb] px-6 py-16">

      {/* SLIDER */}
      <div
        className="relative max-w-6xl mx-auto mb-28"
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

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-3xl shadow-[0_12px_35px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="h-72 w-full object-cover"
            />

            <div className="p-10 relative">
              <h2 className="text-3xl font-semibold text-[#2f6f6a] mb-4">
                {slides[index].title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                {slides[index].desc}
              </p>

              {/* Breathing animation ONLY on breathing slide */}
              {slides[index].type === "breathing" && (
                <div className="mb-10 flex justify-start">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-24 h-24 rounded-full bg-blue-200/60 flex items-center justify-center"
                  >
                    <span className="text-sm text-blue-700">
                      breathe
                    </span>
                  </motion.div>
                </div>
              )}

              <button
                onClick={() => navigate(slides[index].route)}
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
    </div>
  );
};

export default Home;
