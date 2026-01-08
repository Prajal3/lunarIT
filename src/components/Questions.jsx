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

  /* ------------------ Analyze Answers with AI ------------------ */
  const analyzeAnswers = async (userAnswers) => {
    setIsAnalyzing(true);
    
    try {
      // Prepare the answers for AI analysis
      const answersText = userAnswers
        .map((item, i) => `Q${i + 1}: ${item.question}\nAnswer: ${item.answer}`)
        .join("\n\n");

      // Call Claude API for personalized analysis
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a compassionate mental health assessment analyzer. Based on the following responses to a mental health check-in, provide a personalized analysis.

${answersText}

Please respond ONLY with a valid JSON object (no markdown, no backticks) in this exact format:
{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentences about their overall wellbeing>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "areasForGrowth": ["<area 1>", "<area 2>"],
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
}

Guidelines:
- Be warm, supportive, and non-judgmental
- Score should reflect overall wellbeing (higher = better)
- Identify 2-3 genuine strengths from their responses
- Note 2-3 areas that could use support
- Provide 3-4 actionable, specific recommendations
- Keep all text concise and encouraging
- This is NOT a clinical diagnosis, just supportive reflection`
            }
          ],
        }),
      });

      const data = await response.json();
      
      // Extract text from response
      const text = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("");

      // Parse the JSON response
      const cleanText = text.replace(/```json\n?|```\n?/g, "").trim();
      const aiReport = JSON.parse(cleanText);

      setReport(aiReport);
      setShowReport(true);
    } catch (error) {
      console.error("AI analysis error:", error);
      // Fallback to rule-based system if AI fails
      const fallbackReport = generateFallbackReport(userAnswers);
      setReport(fallbackReport);
      setShowReport(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* ------------------ Fallback Report Generator ------------------ */
  const generateFallbackReport = (userAnswers) => {
    const scoreMap = {
      "Calm and positive": 3, "Mostly okay": 2, "Somewhat overwhelmed": 1, "Very stressed": 0,
      "Very well": 3, "Okay": 2, "Poorly": 1, "Very poorly": 0,
      "Rarely": 3, "Sometimes": 2, "Often": 1, "Almost always": 0,
      "Very connected": 3, "Somewhat connected": 2, "A little isolated": 1, "Very isolated": 0,
      "Very confident": 3, "Mostly confident": 2, "Sometimes struggle": 1, "Often overwhelmed": 0,
    };

    let totalScore = 0;
    userAnswers.forEach((item) => {
      totalScore += scoreMap[item.answer] || 0;
    });

    const percentageScore = Math.round((totalScore / (userAnswers.length * 3)) * 100);

    const strengths = [];
    const areasForGrowth = [];
    const recommendations = [];

    const ans = userAnswers.map(a => a.answer);

    if (ans[0] === "Calm and positive" || ans[0] === "Mostly okay") {
      strengths.push("Strong emotional awareness and stability");
    } else {
      areasForGrowth.push("Emotional regulation during stressful times");
      recommendations.push("Try journaling for 5 minutes each evening to process emotions");
    }

    if (ans[1] === "Very well" || ans[1] === "Okay") {
      strengths.push("Healthy sleep patterns and rest quality");
    } else {
      areasForGrowth.push("Sleep quality and nighttime routines");
      recommendations.push("Create a calming bedtime routine without screens 1 hour before sleep");
    }

    if (ans[2] === "Rarely" || ans[2] === "Sometimes") {
      strengths.push("Effective stress management strategies");
    } else {
      areasForGrowth.push("Managing daily stress and anxiety");
      recommendations.push("Practice the 4-7-8 breathing technique when feeling overwhelmed");
    }

    if (ans[3] === "Very connected" || ans[3] === "Somewhat connected") {
      strengths.push("Strong social connections and support network");
    } else {
      recommendations.push("Reach out to one friend or family member this week for a meaningful chat");
    }

    if (ans[4] === "Very confident" || ans[4] === "Mostly confident") {
      strengths.push("Resilience and confidence in facing challenges");
    } else {
      recommendations.push("Break big tasks into smaller steps to build confidence gradually");
    }

    if (!recommendations.length) {
      recommendations.push("Continue your positive habits with regular check-ins");
    }

    let summary = "";
    if (percentageScore >= 80) {
      summary = "You're doing wonderfully! Your responses show strong mental wellbeing and healthy coping strategies. Keep nurturing these positive habits.";
    } else if (percentageScore >= 60) {
      summary = "You show healthy self-awareness with some areas that could benefit from gentle attention. You're on a positive path with room to grow.";
    } else if (percentageScore >= 40) {
      summary = "You're managing, but there are areas where extra self-care could make a meaningful difference. Remember, asking for support is a sign of strength.";
    } else {
      summary = "Thank you for your honesty. Things seem challenging right now. Please know that support is available, and reaching out is courageous and important.";
    }

    return {
      overallScore: percentageScore,
      summary,
      strengths: strengths.length > 0 ? strengths : ["Your willingness to reflect and seek growth"],
      areasForGrowth: areasForGrowth.length > 0 ? areasForGrowth : ["Continue building on your foundation"],
      recommendations,
    };
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
            />

            {/* Growth */}
            <Section
              icon={<TrendingUp className="text-[#5fb3a2]" />}
              title="Areas for Growth"
              items={report.areasForGrowth}
              bg="bg-[#eef7f4]"
              border="border-[#bfe8df]"
            />

            {/* Recommendations */}
            <Section
              icon={<Brain className="text-[#5fb3a2]" />}
              title="Recommendations"
              items={report.recommendations}
              bg="bg-[#f3fbf9]"
              border="border-[#bfe8df]"
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
            Analyzing your responses with AI…
          </h3>
          <p className="text-gray-500 mt-2">Creating your personalized report</p>
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
          className="px-8 py-4 bg-[#5fb3a2] hover:bg-[#4aa292] text-white rounded-xl font-semibold flex items-center gap-3 mx-auto transition disabled:opacity-50"
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

/* ------------------ Fallback Questions ------------------ */
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

export default Questions;