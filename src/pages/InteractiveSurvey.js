import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";

const SURVEY_QUESTIONS = [
  {
    id: "name",
    section: "BASIC INFORMATION",
    question: "What is your full name?",
    placeholder: "Jane Doe",
    type: "text",
  },
  {
    id: "email",
    section: "BASIC INFORMATION",
    question: "What is your email address?",
    placeholder: "jane@company.com",
    type: "text",
  },
  {
    id: "age",
    section: "BASIC INFORMATION",
    question: "What is your age range?",
    type: "single",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
  },
  {
    id: "role",
    section: "BASIC INFORMATION",
    question: "What is your role?",
    type: "single",
    options: ["Business Owner", "Logistics Manager", "Supplier / Manufacturer", "Student", "Startup Founder", "Other"],
  },
  {
    id: "industry",
    section: "BASIC INFORMATION",
    question: "Which industry are you associated with?",
    placeholder: "e.g., FMCG, Manufacturing, Retail, Logistics",
    type: "text",
  },
  {
    id: "problems",
    section: "CURRENT CHALLENGES",
    question: "What major problems do you face in supply chain or operations?",
    type: "multi",
    options: [
      "Difficulty finding reliable suppliers",
      "High logistics cost",
      "Delivery delays",
      "Poor communication between stakeholders",
      "Inventory mismanagement",
      "Lack of data/insights",
      "Other",
    ],
  },
  {
    id: "frequency",
    section: "CURRENT CHALLENGES",
    question: "How frequently do you face these problems?",
    type: "single",
    options: ["Daily", "Weekly", "Occasionally", "Rarely"],
  },
  {
    id: "biggest_challenge",
    section: "CURRENT CHALLENGES",
    question: "What is the biggest challenge for your business right now?",
    placeholder: "Tell us the raw truth...",
    type: "textarea",
  },
  {
    id: "use_tools",
    section: "CURRENT SOLUTIONS",
    question: "Do you currently use any tools or consultants for supply chain management?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "current_tools",
    section: "CURRENT SOLUTIONS",
    question: "What tools do you use?",
    placeholder: "e.g., Excel, ERP systems, consultants",
    type: "text",
    condition: (answers) => answers.use_tools === "Yes",
  },
  {
    id: "solution_problems",
    section: "CURRENT SOLUTIONS",
    question: "What problems do you face with your current solutions?",
    type: "multi",
    options: ["Too expensive", "Too complex", "Not effective", "Lack of customization", "No real-time insights", "Other"],
  },
  {
    id: "barriers",
    section: "BARRIERS",
    question: "What stops you from hiring consultants or using advanced tools?",
    type: "multi",
    options: ["High cost", "Lack of trust", "Lack of awareness", "Difficult to use", "Not sure about ROI", "Other"],
  },
  {
    id: "features",
    section: "EXPECTATIONS",
    question: "What features would you like in a consulting platform?",
    type: "multi",
    options: [
      "Supplier recommendations",
      "Cost optimization insights",
      "Demand forecasting",
      "Logistics tracking",
      "Easy communication tools",
      "Dashboard with analytics",
      "Other",
    ],
  },
  {
    id: "importance_data",
    section: "EXPECTATIONS",
    question: "How important is real-time data/insights for your business?",
    type: "scale",
    min: 1,
    max: 5,
    minLabel: "Not important",
    maxLabel: "Very important",
  },
  {
    id: "willing_to_pay",
    section: "COMMERCIAL INSIGHT",
    question: "Would you be willing to pay for a platform that improves your supply chain efficiency?",
    type: "single",
    options: ["Yes", "No", "Maybe"],
  },
  {
    id: "pay_amount",
    section: "COMMERCIAL INSIGHT",
    question: "How much would you be willing to pay monthly?",
    type: "single",
    options: ["Less than ₹1000", "₹1000–₹5000", "₹5000–₹10000", "More than ₹10000"],
    condition: (answers) => answers.willing_to_pay === "Yes" || answers.willing_to_pay === "Maybe",
  },
  {
    id: "open_insight",
    section: "OPEN INSIGHT",
    question: "What would make a consulting platform truly useful for you?",
    placeholder: "Share your ultimate wishlist here...",
    type: "textarea",
  },
];

export default function InteractiveSurvey() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // Find the next applicable question index based on conditions
  const getNextIdx = (idx, answers) => {
    let nextIdx = idx + 1;
    while (nextIdx < SURVEY_QUESTIONS.length) {
      if (!SURVEY_QUESTIONS[nextIdx].condition || SURVEY_QUESTIONS[nextIdx].condition(answers)) {
        return nextIdx;
      }
      nextIdx++;
    }
    return nextIdx;
  };

  const getPrevIdx = (idx, answers) => {
    let prevIdx = idx - 1;
    while (prevIdx >= 0) {
      if (!SURVEY_QUESTIONS[prevIdx].condition || SURVEY_QUESTIONS[prevIdx].condition(answers)) {
        return prevIdx;
      }
      prevIdx--;
    }
    return prevIdx;
  };

  const handleNext = () => {
    const nextIdx = getNextIdx(currentIdx, answers);
    if (nextIdx >= SURVEY_QUESTIONS.length) {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("survey_responses") || "[]");
      existing.push({ ...answers, timestamp: new Date().toISOString() });
      localStorage.setItem("survey_responses", JSON.stringify(existing));
      setCompleted(true);
    } else {
      setCurrentIdx(nextIdx);
    }
  };

  const handlePrev = () => {
    const prevIdx = getPrevIdx(currentIdx, answers);
    if (prevIdx >= 0) {
      setCurrentIdx(prevIdx);
    } else {
      navigate("/");
    }
  };

  const handleAnswer = (val) => {
    const q = SURVEY_QUESTIONS[currentIdx];
    if (q.type === "single" || q.type === "scale") {
      setAnswers((prev) => {
        const updated = { ...prev, [q.id]: val };
        // Auto-advance for single select / scale if needed, but let's just do it directly here
        setTimeout(() => {
          const nextIdx = getNextIdx(currentIdx, updated);
          if (nextIdx >= SURVEY_QUESTIONS.length) {
            const existing = JSON.parse(localStorage.getItem("survey_responses") || "[]");
            existing.push({ ...updated, timestamp: new Date().toISOString() });
            localStorage.setItem("survey_responses", JSON.stringify(existing));
            setCompleted(true);
          } else {
            setCurrentIdx(nextIdx);
          }
        }, 300);
        return updated;
      });
    } else if (q.type === "multi") {
      setAnswers((prev) => {
        const currentArr = prev[q.id] || [];
        if (currentArr.includes(val)) {
          return { ...prev, [q.id]: currentArr.filter((item) => item !== val) };
        } else {
          return { ...prev, [q.id]: [...currentArr, val] };
        }
      });
    } else {
      setAnswers((prev) => ({ ...prev, [q.id]: val }));
    }
  };

  // Prevent rendering out of bounds if completed
  if (completed) {
    return (
      <div className="min-h-screen bg-ink-0 flex items-center justify-center p-6 text-center">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-50" />
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-md w-full bg-ink-100 border border-ink-300 p-8 card"
        >
          <div className="glow-ring" />
          <div className="w-16 h-16 bg-volt/10 text-volt rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">You're awesome!</h2>
          <p className="text-ink-600 mb-8">
            Thank you for sharing your thoughts. Your insights are incredibly valuable and will directly shape the future of our platform.
          </p>
          <button onClick={() => navigate("/")} className="btn-primary w-full justify-center">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQ = SURVEY_QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / SURVEY_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-ink-0 flex flex-col font-sans text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-30" />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-10" />

      {/* Header / Progress */}
      <header className="w-full flex flex-col z-10 px-6 py-6 md:px-12 md:py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrev} className="text-ink-700 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="font-mono text-xs text-ink-600 uppercase tracking-widest">
            {currentQ.section}
          </span>
        </div>
        <div className="w-full h-1 bg-ink-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-volt"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>

      {/* Main Question Area */}
      <main className="flex-1 flex flex-col justify-center px-6 pb-20 z-10 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="font-mono text-volt mb-4 text-sm">
              Question {currentIdx + 1} of {SURVEY_QUESTIONS.length}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-8">
              {currentQ.question}
            </h1>

            {/* Answers */}
            <div className="w-full">
              {currentQ.type === "single" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className={`text-left p-4 border transition-all duration-200 ${
                        answers[currentQ.id] === opt
                          ? "bg-volt/10 border-volt text-white"
                          : "bg-ink-100 border-ink-300 text-ink-600 hover:border-ink-400 hover:bg-ink-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === "multi" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = (answers[currentQ.id] || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className={`text-left p-4 border flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "bg-volt/10 border-volt text-white"
                            : "bg-ink-100 border-ink-300 text-ink-600 hover:border-ink-400 hover:bg-ink-200"
                        }`}
                      >
                        {opt}
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-volt" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {(currentQ.type === "text" || currentQ.type === "textarea") && (
                <div className="space-y-4">
                  {currentQ.type === "text" ? (
                    <input
                      type="text"
                      className="w-full bg-ink-100 border border-ink-300 p-4 text-white placeholder:text-ink-600 focus:outline-none focus:border-volt transition-colors"
                      placeholder={currentQ.placeholder}
                      value={answers[currentQ.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      autoFocus
                    />
                  ) : (
                    <textarea
                      className="w-full bg-ink-100 border border-ink-300 p-4 text-white placeholder:text-ink-600 focus:outline-none focus:border-volt transition-colors min-h-[150px] resize-none"
                      placeholder={currentQ.placeholder}
                      value={answers[currentQ.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      autoFocus
                    />
                  )}
                </div>
              )}

              {currentQ.type === "scale" && (
                <div className="w-full space-y-6">
                  <div className="flex justify-between items-end gap-2 h-32">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleAnswer(num)}
                        className={`flex-1 flex flex-col items-center justify-end gap-3 transition-all duration-300 group`}
                      >
                        <div
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            answers[currentQ.id] === num
                              ? "bg-volt"
                              : answers[currentQ.id] > num
                              ? "bg-volt/50"
                              : "bg-ink-300 group-hover:bg-ink-400"
                          }`}
                          style={{ height: `${num * 20}%` }}
                        />
                        <span
                          className={`font-mono text-sm ${
                            answers[currentQ.id] === num ? "text-volt" : "text-ink-600"
                          }`}
                        >
                          {num}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-ink-600">
                    <span>{currentQ.minLabel}</span>
                    <span>{currentQ.maxLabel}</span>
                  </div>
                </div>
              )}

              {/* Next Button for Multi/Text types where auto-advance isn't ideal */}
              {(currentQ.type === "multi" || currentQ.type === "text" || currentQ.type === "textarea") && (
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={handleNext}
                    className="btn-primary"
                    disabled={
                      (currentQ.type === "text" || currentQ.type === "textarea") &&
                      !(answers[currentQ.id] && answers[currentQ.id].trim() !== "")
                    }
                  >
                    {currentIdx === SURVEY_QUESTIONS.length - 1 ? (
                      <>Submit Responses <Send className="w-4 h-4" /></>
                    ) : (
                      <>Next Step <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                  <span className="text-ink-700 text-sm font-mono">Press Enter ↵</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
