"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "HI" },
    { code: "mr", label: "MR" },
  ];

  return (
    <div className="flex gap-2 bg-black/20 backdrop-blur-md p-1 rounded-full border border-white/10">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === lang.code
              ? "bg-[#ffcf56] text-[#740938] shadow-md"
              : "text-white hover:bg-white/10"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
