import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import frontImg from "../assets/frontimg.png";

const Front = () => {
    const navigate = useNavigate();

    return (
        <div
            className="relative h-screen w-full flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${frontImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 via-purple-900/30 to-indigo-800/40"></div>

            {/* Soft particles */}
            <div className="absolute inset-0">
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6)_2px,transparent_0),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.5)_2px,transparent_0),radial-gradient(circle_at_40%_70%,rgba(255,255,255,0.4)_1.5px,transparent_0),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.4)_1.5px,transparent_0)] animate-[twinkle_8s_linear_infinite]"></div>
            </div>

            {/* Floating Glass Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
                className="relative z-10 text-center text-white px-6 py-10 max-w-md sm:max-w-xl
                   backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl animate-float"
            >
                {/* Subtitle Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 70 }}
                    className="inline-block mb-5 px-5 py-2 rounded-full bg-white/20 text-sm tracking-wide backdrop-blur-md shadow-md"
                >
                    Safe • Private • Supportive
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
                    className="text-3xl sm:text-5xl font-bold mb-5 tracking-tight drop-shadow-xl leading-tight"
                >
                    Your Mental Health Matters
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-base sm:text-lg mb-8 text-white/90 leading-relaxed"
                >
                    A calm and caring space to understand, heal, and improve your mental
                    well-being  at your own pace.
                </motion.p>

                {/* Enter Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/home")}
                    className="px-12 py-3 sm:px-14 sm:py-4 rounded-full font-semibold text-lg
                     bg-linear-to-r from-indigo-500 to-purple-500
                     hover:from-indigo-600 hover:to-purple-600
                     transition-all duration-300 shadow-lg"
                >
                    Enter
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Front;
