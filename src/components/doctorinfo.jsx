import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Ananya Sharma",
    role: "Clinical Psychologist",
    hospital: "MindCare Wellness Center",
    phone: "+977 9812345678",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    desc:
      "Specializes in stress management, anxiety relief, and emotional balance through mindfulness-based therapy.",
  },
  {
    name: "Dr. Rahul Verma",
    role: "Psychiatrist",
    hospital: "Peace Mental Health Hospital",
    phone: "+977 9801122334",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    desc:
      "Focused on anxiety disorders, depression, and holistic mental well-being with a calm, patient-first approach.",
  },
  {
    name: "Dr. Suman Karki",
    role: "Mental Health Counselor",
    hospital: "Harmony Neuro Clinic",
    phone: "+977 9845678901",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    desc:
      "Helps individuals cope with stress, burnout, and emotional overload through supportive counseling.",
  },
  {
    name: "Dr. Neha Patel",
    role: "Behavioral Therapist",
    hospital: "Serenity Psychological Care",
    phone: "+977 9865432109",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    desc:
      "Works with behavioral therapy techniques to improve emotional resilience and mental clarity.",
  },
];

const DoctorsSection = () => {
  return (
    <div className="max-w-6xl mx-auto mt-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {doctors.map((doc, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 text-center"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-28 h-28 mx-auto rounded-full object-cover shadow-md mb-4"
            />

            <h3 className="text-lg font-semibold text-[#2f6f6a]">
              {doc.name}
            </h3>

            <p className="text-sm text-[#5f8f88] mb-2">
              {doc.role}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              🏥 {doc.hospital}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              📞 {doc.phone}
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
              {doc.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DoctorsSection;
