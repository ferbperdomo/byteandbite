"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const t = useTranslations("about");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", checkDesktop);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center lg:justify-start p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop with animated gradient - more subtle on desktop */}
          <motion.div
            className={`absolute inset-0 backdrop-blur-sm ${
              isDesktop ? "bg-black/20" : "bg-black/80"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#b65c25]/30 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Modal content */}
          <motion.div
            className={`relative backdrop-blur-md border border-[#b65c25]/30 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] lg:max-w-2xl lg:w-[600px] lg:max-h-[90vh] overflow-y-auto ${
              isDesktop
                ? "bg-black/90 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-[#b65c25]/20"
                : "bg-black/95 shadow-2xl"
            }`}
            initial={{
              scale: isDesktop ? 0.8 : 0.5,
              opacity: 0,
              rotateY: isDesktop ? 0 : -15,
              x: isDesktop ? -600 : 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotateY: 0,
              x: 0,
            }}
            exit={{
              scale: isDesktop ? 0.8 : 0.5,
              opacity: 0,
              rotateY: isDesktop ? 0 : 15,
              x: isDesktop ? -600 : 0,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            whileHover={
              isDesktop
                ? {
                    scale: 1.02,
                    boxShadow:
                      "0 35px 60px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(182,92,37,0.3)",
                  }
                : {}
            }
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-[#b65c25] text-2xl font-bold transition-colors duration-300 z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {/* Header with animated title */}
            <motion.div
              className="text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-[#b65c25] mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {t("title")}
              </motion.h2>

              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-[#b65c25] to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Content with typewriter effect */}
            <motion.div
              className="text-white/90 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.p
                className="mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {t("description")}
              </motion.p>
            </motion.div>

            {/* Animated decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#b65c25]/50 rounded-tl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#b65c25]/50 rounded-br-lg" />

            {/* Floating elements */}
            <motion.div
              className="absolute top-1/4 right-8 w-4 h-4 bg-[#b65c25]/20 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-8 w-6 h-6 bg-[#b65c25]/20 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
