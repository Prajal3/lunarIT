import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Heart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const Questions = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /* ------------------ Generate Questions ------------------ */
  const generateQuestions = async () => {
    setIsGenerating(true);
    try {
      // 🔒 API call removed for safety in demo
      setQuestions(fallbackQuestions);
      setShowQuiz(true);
    } catch (err) {
      setQuestions(fallbackQuestions);
      setShowQuiz(true);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ------------------ Handle Answers ------------------ */
  const handleAnswer = (answer) => {
    const newAnswers = [
      ...answers,
      { question: questions[currentQuestion].question, answer },
    ];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeAnswers(newAnswers);
    }
  };

  /* ------------------ Analyze Answers ------------------ */
  const analyzeAnswers = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setReport(fallbackReport);
      setShowReport(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setShowReport(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuestions([]);
    setReport(null);
  };

  /* ------------------ REPORT SCREEN ------------------ */
  if (showReport && report) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#eef7f4] to-white flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#5fb3a2] p-8 text-white text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-3 animate-pulse" />
            <h2 className="text-3xl font-bold">Your Mental Health Report</h2>
            <p className="opacity-90 mt-1">A gentle reflection of your wellbeing</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Score */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#2f6f6a]">
                {report.overallScore}
              </div>
              <p className="text-gray-500">Wellbeing Score</p>
            </div>

            {/* Summary */}
            <div className="bg-[#eef7f4] p-6 rounded-xl border border-[#bfe8df]">
              <p className="text-gray-700">{report.summary}</p>
            </div>

            {/* Strengths */}
            <Section
              icon={<Heart className="text-[#5fb3a2]" />}
              title="Your Strengths"
              items={report.strengths}
              bg="bg-green-50"
              border="border-green-200"
              iconColor="text-green-600"
            />

            {/* Growth */}
            <Section
              icon={<TrendingUp className="text-[#5fb3a2]" />}
              title="Areas for Growth"
              items={report.areasForGrowth}
              bg="bg-[#eef7f4]"
              border="border-[#bfe8df]"
              iconColor="text-[#2f6f6a]"
            />

            {/* Recommendations */}
            <Section
              icon={<Brain className="text-[#5fb3a2]" />}
              title="Recommendations"
              items={report.recommendations}
              bg="bg-[#f3fbf9]"
              border="border-[#bfe8df]"
              iconColor="text-[#5fb3a2]"
            />

            <button
              onClick={resetQuiz}
              className="w-full py-4 bg-[#5fb3a2] hover:bg-[#4aa292] text-white rounded-xl font-semibold transition"
            >
              Take Another Check-In
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------ ANALYZING ------------------ */
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#eef7f4] flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#5fb3a2] mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-700">
            Analyzing your responses…
          </h3>
        </div>
      </div>
    );
  }

  /* ------------------ QUIZ ------------------ */
  if (showQuiz && questions.length > 0) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-[#eef7f4] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5fb3a2] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#5fb3a2] rounded-full flex items-center justify-center">
                <Brain className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#2f6f6a]">
                Mental Health Check-In
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              {questions[currentQuestion].question}
            </p>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left bg-[#eef7f4] hover:bg-[#dff3ee] border-2 border-[#bfe8df] hover:border-[#5fb3a2] rounded-xl transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------ START SCREEN ------------------ */
  return (
    <div className="min-h-screen bg-[#eef7f4] flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#5fb3a2]/30 blur-3xl rounded-full animate-pulse"></div>
          <Brain className="w-24 h-24 mx-auto text-[#5fb3a2] relative" />
        </div>

        <h1 className="text-4xl font-bold text-[#2f6f6a] mb-4">
          Mental Health Check-In
        </h1>

        <p className="text-gray-600 mb-8">
          Take a gentle self-assessment to reflect on your wellbeing.
          This is not a diagnosis — just a moment for you.
        </p>

        <button
          onClick={generateQuestions}
          disabled={isGenerating}
          className="px-8 py-4 bg-[#5fb3a2] hover:bg-[#4aa292] text-white rounded-xl font-semibold flex items-center gap-3 mx-auto transition"
        >
          <Sparkles className="w-5 h-5" />
          Start Check-In
        </button>
      </div>
    </div>
  );
};

/* ------------------ Reusable Section ------------------ */
const Section = ({ icon, title, items, bg, border }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className={`p-4 ${bg} ${border} border rounded-xl text-gray-700`}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

/* ------------------ Fallback Data ------------------ */
const fallbackQuestions = [
  {
    question: "How have you been feeling emotionally this past week?",
    options: ["Calm and positive", "Mostly okay", "Somewhat overwhelmed", "Very stressed"],
  },
  {
    question: "How well are you sleeping lately?",
    options: ["Very well", "Okay", "Poorly", "Very poorly"],
  },
  {
    question: "How often do you feel stressed or anxious?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
  },
  {
    question: "How connected do you feel to others?",
    options: ["Very connected", "Somewhat connected", "A little isolated", "Very isolated"],
  },
  {
    question: "How confident are you in handling challenges?",
    options: ["Very confident", "Mostly confident", "Sometimes struggle", "Often overwhelmed"],
  },
];

const fallbackReport = {
  overallScore: 72,
  summary:
    "You show a healthy level of self-awareness with some areas that could benefit from gentle care and balance.",
  strengths: ["Self-reflection", "Emotional awareness"],
  areasForGrowth: ["Stress regulation", "Rest and recovery"],
  recommendations: [
    "Practice slow breathing or mindfulness daily",
    "Maintain consistent sleep routines",
    "Reach out to someone you trust for support",
  ],
};

export default Questions;
