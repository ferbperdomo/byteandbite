"use client";

import AboutModal from "@/components/ui/AboutModal";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <section className="w-full bg-black relative text-white">
      <div className="hidden lg:block h-screen relative w-full mb-32">
        <motion.div
          className="absolute left-0 top-0 w-[75%] h-screen"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="https://res.cloudinary.com/dzmjezjhd/image/upload/v1758240466/DSC00123_vc8kpt.jpg"
            alt="BYTE STUDIO Hero Image"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
        </motion.div>

        <motion.div
          className="absolute right-24 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xs p-12 pl-16 text-center w-[25%] md:w-[40%] 2xl:w-[45%] h-[50vh] z-10 overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Animated lighting effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/30 to-transparent w-[200%]"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="relative z-10 max-w-lg 2xl:max-w-4xl mx-auto text-center h-full flex flex-col justify-center">
            <motion.h1
              className="text-3xl 2xl:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              {t("title")
                .split(", ")
                .map((part, index) => (
                  <span key={index}>
                    {part}
                    {index === 0 && (
                      <>
                        <span className="xl:hidden">,</span>
                        <br className="xl:hidden" />
                        <span className="hidden xl:inline">, </span>
                      </>
                    )}
                  </span>
                ))}
            </motion.h1>

            <motion.p
              className="text-lg xl:text-xl leading-relaxed mb-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              className="flex gap-4 flex-col sm:flex-row justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="bg-[#b65c25] text-white px-8 py-4 rounded-lg text-lg font-semibold border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#a55220]"
              >
                {t("cta")}
              </button>

              <Link
                href="/#services"
                className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black inline-block text-center"
              >
                {t("secondary")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="lg:hidden h-[80vh] relative mb-48">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="https://res.cloudinary.com/dzmjezjhd/image/upload/v1756399285/DSC09866_lwi7qs.jpg"
            alt="BYTE STUDIO Hero Image"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </motion.div>

        <motion.div
           className="absolute bottom-0 left-0 right-0 translate-y-1/4 bg-black/80 backdrop-blur-xs p-8 pt-16 w-[90%] mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Animated lighting effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/30 to-transparent w-[200%]"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="relative z-10 max-w-lg mx-auto text-center">
            <motion.h1
              className="text-2xl md:text-3xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              {t("title")
                .split(", ")
                .map((part, index) => (
                  <span key={index}>
                    {part}
                    {index === 0 && (
                      <>
                        <span className="xl:hidden">,</span>
                        <br className="xl:hidden" />
                        <span className="hidden xl:inline">, </span>
                      </>
                    )}
                  </span>
                ))}
            </motion.h1>

            <motion.p
              className="text-lg leading-relaxed mb-6 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              className="flex gap-4 flex-row justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="bg-[#b65c25] text-white px-8 py-4 rounded-lg text-sm md:text-lg font-semibold border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#a55220]"
              >
                {t("cta")}
              </button>

              <Link
                href="/#services"
                className="bg-transparent text-white px-8 py-4 rounded-lg text-sm md:text-lg font-semibold border-2 border-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black inline-block text-center"
              >
                {t("secondary")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </section>
  );
}
