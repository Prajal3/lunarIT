import { useState, useEffect } from 'react';
import { X, Wind, CircleDot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Breath = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState('inhale');
  const [counter, setCounter] = useState(4);

  // Mental health calming colors
  const phases = {
    inhale: { duration: 4000, text: 'Breathe In', color: 'from-[#6EE7B7] to-[#3B82F6]' }, 
    hold1: { duration: 4000, text: 'Hold', color: 'from-[#A78BFA] to-[#F9A8D4]' },      
    exhale: { duration: 4000, text: 'Breathe Out', color: 'from-[#5fb3a2] to-[#7fd1c3]' }, 
    hold2: { duration: 4000, text: 'Relax', color: 'from-[#34D399] to-[#10B981]' }      
  };

  // Cycle phases
  useEffect(() => {
    if (!isOpen) return;

    const phaseOrder = ['inhale', 'hold1', 'exhale', 'hold2'];
    const currentPhaseIndex = phaseOrder.indexOf(phase);

    const cyclePhase = () => {
      const nextPhaseIndex = (currentPhaseIndex + 1) % phaseOrder.length;
      const nextPhase = phaseOrder[nextPhaseIndex];
      setPhase(nextPhase);
      setCounter(phases[nextPhase].duration / 1000);
    };

    const phaseInterval = setInterval(cyclePhase, phases[phase].duration);
    return () => clearInterval(phaseInterval);
  }, [isOpen, phase]);

  // Countdown
  useEffect(() => {
    if (!isOpen || counter <= 0) return;

    const countInterval = setInterval(() => {
      setCounter(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(countInterval);
  }, [isOpen, counter, phase]);

  const getCircleScale = () => (phase === 'inhale' || phase === 'hold1' ? 1.5 : 0.75);
  const getCircleOpacity = () => (phase === 'hold1' || phase === 'hold2' ? 0.8 : 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 z-10"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200 group"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-slate-300 group-hover:text-white" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Wind className="w-8 h-8 text-[#5fb3a2]" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">Breathing Exercise</h2>
              </div>
              <p className="text-slate-400 text-sm md:text-base">
                Follow the circle and breathe calmly
              </p>
            </div>

            {/* Breathing Circle */}
            <div className="flex items-center justify-center mb-8 relative h-64 md:h-80">
              {/* Outer Glow */}
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute rounded-full w-48 h-48 md:w-64 md:h-64 blur-xl opacity-20 bg-linear-to-r ${phases[phase].color}`}
              />

              {/* Main Circle */}
              <motion.div
                animate={{ scale: getCircleScale() }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-2xl bg-linear-to-r ${phases[phase].color}`}
                style={{ opacity: getCircleOpacity() }}
              >
                <CircleDot className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" />
              </motion.div>

              {/* Counter */}
              <div className="absolute text-6xl md:text-7xl font-bold text-white opacity-30">
                {counter}
              </div>
            </div>

            {/* Phase Instructions */}
            <div className="text-center space-y-4">
              <motion.div
                key={phase}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`inline-block px-8 py-3 rounded-full shadow-lg bg-linear-to-r ${phases[phase].color}`}
              >
                <p className="text-2xl md:text-3xl font-bold text-white">{phases[phase].text}</p>
              </motion.div>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {['inhale', 'hold1', 'exhale', 'hold2'].map((p) => (
                  <div
                    key={p}
                    className={`h-2 w-12 rounded-full transition-all duration-300 ${
                      phase === p ? `bg-linear-to-r ${phases[p].color}` : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 p-4 bg-slate-700 bg-opacity-50 rounded-xl">
              <p className="text-slate-300 text-sm text-center">
                💡 Find a comfortable position and focus on your breathing
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Breath;
