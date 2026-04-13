"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Activity, UserRound } from "lucide-react";

export const SymptomChecker = () => {
  const { t } = useLanguage();
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<null | { analysis: string; doctor: string }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCheck = () => {
    if (!symptom.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI Analysis
    setTimeout(() => {
      let analysis = "Based on your description, you might be experiencing mild seasonal symptoms. Stay hydrated and rest.";
      let doctor = t("generalPhysician");

      if (symptom.toLowerCase().includes("fever")) {
        analysis = "A fever indicates your body is fighting an infection. Monitor your temperature every 4 hours.";
      } else if (symptom.toLowerCase().includes("headache")) {
        analysis = "Headaches can be caused by stress, dehydration, or eye strain. Consider dimming lights and resting.";
      } else if (symptom.toLowerCase().includes("child") || symptom.toLowerCase().includes("baby")) {
        doctor = t("pediatrician");
      }

      setResult({ analysis, doctor });
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-xl border-t-[8px] border-[#AF1740] flex flex-col h-full min-h-0">
      <h2 className="text-xl font-bold mb-3 text-[#740938] flex items-center gap-2 shrink-0">
        <Brain className="w-6 h-6 text-[#AF1740]" /> {t("symptomCheckerTitle")}
      </h2>
      
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto remove-scrollbar">
        <div className="relative">
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder={t("symptomPrompt")}
            className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl resize-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AF1740]/20"
            rows={3}
          />
          <button
            onClick={handleCheck}
            disabled={isAnalyzing || !symptom.trim()}
            className="absolute bottom-3 right-3 p-2 bg-[#AF1740] text-white rounded-xl shadow-lg hover:bg-[#740938] transition-colors disabled:bg-gray-300"
          >
            {isAnalyzing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Activity className="w-4 h-4" />
              </motion.div>
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-[#fdf2f2] rounded-2xl border border-[#AF1740]/10"
            >
              <div className="mb-3">
                <p className="text-xs font-bold text-[#AF1740] uppercase tracking-wider mb-1">{t("analysis")}</p>
                <p className="text-sm text-[#740938] leading-relaxed">{result.analysis}</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#AF1740]/10">
                <div className="p-2 bg-white rounded-lg">
                  <UserRound className="w-4 h-4 text-[#AF1740]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{t("recDoctor")}</p>
                  <p className="text-sm font-bold text-[#740938]">{result.doctor}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
