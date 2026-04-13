"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const HomeSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-[calc(100vh-80px)] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 gap-12 text-white">
      {/* Left Column: Branding & CTA */}
      <div className="flex-1 flex flex-col space-y-8 max-w-2xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[#ffcf56]">
            {t("revolutionize")}
          </h1>
          <p className="text-lg md:text-xl text-gray-100/90 leading-relaxed max-w-lg">
            {t("discover")}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/patient-register">
            <button className="px-8 py-3 rounded-full bg-[#ffcf56] text-[#740938] font-bold text-lg hover:brightness-110 transition shadow-lg">
              {t("registerPatient")}
            </button>
          </Link>
          <Link href="/doctor-register">
            <button className="px-8 py-3 rounded-full bg-white text-[#740938] font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              {t("loginDoctor")}
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Column: Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex-1 max-w-md w-full"
      >
        <div className="bg-[#fdf2f2] rounded-3xl p-8 md:p-10 shadow-2xl text-[#740938]">
          <h2 className="text-3xl font-bold mb-6">{t("didYouKnow")}</h2>
          
          <ul className="space-y-5 mb-10">
            <li className="flex items-start gap-3">
              <span className="text-xl">•</span>
              <p className="flex-1 opacity-90">
                {t("fact1")}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">•</span>
              <p className="flex-1 opacity-90">
                {t("fact2")}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">•</span>
              <p className="flex-1 opacity-90">
                {t("fact3")}
              </p>
            </li>
          </ul>

          <div className="border-l-4 border-[#740938] pl-4 italic text-lg text-[#740938]/80">
            {t("quote")}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
