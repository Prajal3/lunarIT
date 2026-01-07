import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESOURCES = [
  {
    id: 1,
    title: "Understanding Anxiety",
    category: "Anxiety",
    content:
      "Anxiety is a normal stress response, but when it becomes overwhelming, it can interfere with daily life. Common symptoms include excessive worry, restlessness, difficulty concentrating, and physical symptoms like rapid heartbeat. Management strategies include deep breathing, regular exercise, adequate sleep, and talking to someone you trust."
  },
  {
    id: 2,
    title: "Dealing with Depression",
    category: "Depression",
    content:
      "Depression is more than feeling sad - it's a medical condition that affects how you feel, think, and handle daily activities. Signs include persistent sadness, loss of interest in activities, changes in appetite or sleep, and feelings of worthlessness. Treatment often includes therapy, medication, lifestyle changes, and support from loved ones."
  },
  {
    id: 3,
    title: "5-4-3-2-1 Grounding Technique",
    category: "Techniques",
    content:
      "This technique helps you stay present when feeling anxious or overwhelmed. Identify: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Take your time with each sense and really focus on what you're experiencing."
  },
  {
    id: 4,
    title: "Box Breathing Exercise",
    category: "Techniques",
    content:
      "Box breathing is a powerful stress-relief technique. Breathe in for 4 counts, hold for 4 counts, breathe out for 4 counts, hold for 4 counts. Repeat 4–5 times. This activates your parasympathetic nervous system, helping you feel calmer and more centered."
  },
  {
    id: 5,
    title: "Managing Stress",
    category: "Stress",
    content:
      "Stress is a natural response to challenges, but chronic stress can harm your health. Healthy coping strategies include regular physical activity, maintaining social connections, practicing mindfulness or meditation, setting boundaries, and ensuring adequate rest."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const categories = ["All", ...new Set(RESOURCES.map(res => res.category))];

  const filteredResources =
    selectedCategory === "All"
      ? RESOURCES
      : RESOURCES.filter(res => res.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-gray-800">
        Self-Help Resources
      </h2>

      {/* Category Buttons */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setExpandedId(null);
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-teal-600 text-white scale-105"
                : "bg-white text-gray-700 hover:bg-teal-100 hover:text-teal-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable Animated Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {filteredResources.map(resource => (
            <motion.div
              key={resource.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-xl p-6 shadow-lg
                         transition-all duration-300
                         hover:shadow-xl hover:scale-[1.02]
                         hover:ring-2 hover:ring-teal-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  {resource.title}
                </h3>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full">
                  {resource.category}
                </span>
              </div>

              <motion.p
                initial={false}
                animate={{
                  height:
                    expandedId === resource.id ? "auto" : "3.5rem"
                }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 leading-relaxed overflow-hidden"
              >
                {resource.content}
              </motion.p>

              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === resource.id ? null : resource.id
                  )
                }
                className="mt-2 text-sm text-teal-600 hover:underline"
              >
                {expandedId === resource.id
                  ? "Read Less"
                  : "Read More"}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Resources;
