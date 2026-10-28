"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Brain,
  Sliders,
  CheckCircle2,
  Lightbulb,
  Zap,
  BookOpen,
} from "lucide-react";

interface AIStudyInputProps {
  onStartQuiz?: (topic: string, confidence: number, questionCount: number) => void;
}

export default function AIStudyInput({ onStartQuiz }: AIStudyInputProps) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [confidence, setConfidence] = useState(75);
  const [questionCount, setQuestionCount] = useState(20);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [speechFeedback, setSpeechFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Suggested universal sample topics
  const suggestedTopics = [
    { name: "Linked List", category: "DSA" },
    { name: "Three-Phase Induction Motor", category: "Electrical" },
    { name: "French Revolution", category: "History / Arts" },
    { name: "TCP 3-Way Handshake", category: "Networking" },
    { name: "Cellular Respiration & ATP", category: "Biology" },
  ];

  // Initialize Web Speech API for voice mic
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = navigator.language || "en-IN";

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechFeedback("🎙️ Listening... speak clearly (e.g. 'Linked List')");
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join("");
          setTopic(transcript);
          setSpeechFeedback(`✓ Heard: "${transcript}"`);
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          const err = event.error;
          if (err === "network") {
            setSpeechFeedback(
              "Google Speech API service unreachable (blocked by browser/VPN/localhost). Please type topic directly or tap a suggestion below."
            );
          } else if (err === "not-allowed" || err === "permission-denied") {
            setSpeechFeedback("Microphone access denied. Please allow microphone in browser URL bar.");
          } else if (err === "no-speech") {
            setSpeechFeedback("No speech detected. Please speak closer to your mic.");
          } else {
            setSpeechFeedback(`Speech paused (${err}). You can type your topic directly.`);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setVoiceSupported(false);
      }
    }
  }, []);

  const toggleVoiceListening = async () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        setSpeechFeedback("Requesting microphone permission...");
        // Explicitly prompt for mic permission if not already granted on localhost
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => track.stop());
          } catch (micErr: any) {
            if (micErr.name === "NotAllowedError") {
              setSpeechFeedback("Microphone permission denied. Allow mic in browser settings.");
              return;
            }
          }
        }
        recognitionRef.current.start();
      } catch (err: any) {
        console.warn("Speech recognition start warning:", err);
        // If already started, stop and restart
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 200);
        } catch (retryErr) {
          setSpeechFeedback("Voice input unavailable. Please type your topic directly.");
        }
      }
    }
  };

  const handleLaunchQuiz = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsSubmitting(true);
    if (onStartQuiz) {
      onStartQuiz(topic.trim(), confidence, questionCount);
    } else {
      const query = new URLSearchParams({
        topic: topic.trim(),
        confidence: confidence.toString(),
        count: questionCount.toString(),
      });
      router.push(`/quiz/dynamic?${query.toString()}`);
    }
  };

  // Confidence descriptive badge
  const getConfidenceBadge = (val: number) => {
    if (val <= 35) {
      return {
        label: "Skimming / Beginner",
        desc: "High risk of blind spots — great time for diagnostic discovery",
        color: "text-amber-700 bg-amber-50 border-amber-200",
      };
    }
    if (val <= 70) {
      return {
        label: "Moderate Familiarity",
        desc: "Solid foundation, testing subtopic edge cases",
        color: "text-blue-700 bg-blue-50 border-blue-200",
      };
    }
    return {
      label: "Strong Mastery",
      desc: "Checking for metacognitive calibration & overconfidence",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    };
  };

  const currentBadge = getConfidenceBadge(confidence);

  return (
    <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Universal Diagnostic Engine</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Works for ANY subject: DSA, Electrical, Arts, Medical, Science</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>What did you study today?</span>
            <span className="text-xl sm:text-2xl">✍️</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Type or speak any topic. RecallIQ will craft an adaptive diagnostic quiz, pinpoint your exact subtopic weak spots, and calculate your memory decay curve.
          </p>
        </div>

        {/* Input Form with Voice Button */}
        <form onSubmit={handleLaunchQuiz} className="space-y-5">
          
          {/* Main Topic Input Field */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Linked List, French Revolution, Three-Phase Induction Motors..."
              className="w-full px-5 py-4 pr-24 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all shadow-inner"
            />

            {/* Voice Mic Button */}
            <div className="absolute right-3 flex items-center gap-2">
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  title={isListening ? "Stop listening" : "Speak topic"}
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
                      : "bg-white/10 hover:bg-white/20 text-slate-200"
                  }`}
                >
                  {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Voice feedback line */}
          <AnimatePresence>
            {speechFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-indigo-300 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>{speechFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              <span>Try:</span>
            </span>
            {suggestedTopics.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setTopic(item.name)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-slate-200 font-medium transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{item.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-semibold">
                  {item.category}
                </span>
              </button>
            ))}
          </div>

          {/* Step 2: Metacognitive Confidence Slider & Question Count */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            
            {/* Confidence Slider Row */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Rate Your Prior Confidence:
                  </span>
                </div>
                <div className="text-base font-black text-indigo-300">
                  {confidence}%
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />

              {/* Dynamic Feedback pill */}
              <div className="mt-2.5 flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${currentBadge.color}`}>
                  {currentBadge.label}
                </span>
                <span className="text-[10px] text-slate-400 italic">
                  {currentBadge.desc}
                </span>
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-300">
                Diagnostic Question Density:
              </span>

              <div className="inline-flex rounded-xl bg-slate-800/80 p-1 border border-white/10">
                {[
                  { count: 5, label: "5 Quick Check" },
                  { count: 10, label: "10 Standard" },
                  { count: 20, label: "20 Full Diagnostic (Recommended)" },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setQuestionCount(item.count)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      questionCount === item.count
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Submit Action Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!topic.trim() || isSubmitting}
              className={`group w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-98 ${
                topic.trim() && !isSubmitting
                  ? "bg-white hover:bg-slate-100 text-slate-950 cursor-pointer shadow-indigo-500/20"
                  : "bg-white/20 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>{isSubmitting ? "Generating AI Diagnostic..." : `Generate ${questionCount}-Question Diagnostic Quiz`}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
