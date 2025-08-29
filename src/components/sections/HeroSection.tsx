"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          padding: "0 20px",
        }}
      >
        <motion.h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "700",
            lineHeight: "1.1",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            lineHeight: "1.6",
            marginBottom: "3rem",
            opacity: 0.8,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {t("cta")}
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              border: "2px solid #ffffff",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {t("secondary")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
