"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="w-full h-screen bg-black flex items-center justify-center relative text-white overflow-hidden overflow-x-hidden">
      <div className="text-center max-w-4xl px-5 mx-auto max-w-full">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 opacity-80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
            {t("cta")}
          </button>

          <button className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black">
            {t("secondary")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
