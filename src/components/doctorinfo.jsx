import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Ramesh Thapa",
    role: "Psychiatrist",
    hospital: "Kathmandu Mental Health Center",
    phone: "+977 9812341122",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    desc:
      "Specializes in depression, anxiety, and stress-related disorders with culturally sensitive therapy.",
  },
  {
    name: "Dr. Sunita Gurung",
    role: "Clinical Psychologist",
    hospital: "Pokhara MindCare Clinic",
    phone: "+977 9801234567",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    desc:
      "Focused on emotional balance, anxiety relief, and mindfulness therapy for individuals and families.",
  },
  {
    name: "Dr. Suman Karki",
    role: "Mental Health Counselor",
    hospital: "Bhaktapur Harmony Clinic",
    phone: "+977 9845678901",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    desc:
      "Helps individuals cope with stress, burnout, and emotional overload through supportive counseling.",
  },
  {
    name: "Dr. Neha Shrestha",
    role: "Behavioral Therapist",
    hospital: "Lalitpur Serenity Psychological Care",
    phone: "+977 9865432109",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    desc:
      "Works with behavioral therapy techniques to improve emotional resilience and mental clarity.",
  },
];

const DoctorsSection = () => {
  return (
    <div className="max-w-6xl mx-auto mt-24 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // stagger each card
            },
          },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {doctors.map((doc, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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

            <p className="text-sm text-[#5f8f88] mb-2">{doc.role}</p>

            <p className="text-sm text-gray-600 mb-1">🏥 {doc.hospital}</p>

            <p className="text-sm text-gray-600 mb-3">📞 {doc.phone}</p>

            <p className="text-sm text-gray-500 leading-relaxed">{doc.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DoctorsSection;
