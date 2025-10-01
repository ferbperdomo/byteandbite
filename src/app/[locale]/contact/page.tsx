"use client";

import ContactForm from "@/components/sections/ContactForm";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Logo Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Multiple animated logo instances */}
          <motion.div
            className="absolute top-10 left-10 w-24 h-24 lg:w-32 lg:h-32 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute top-20 right-20 w-20 h-20 lg:w-28 lg:h-28 opacity-25"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 lg:w-28 lg:h-28 opacity-20"
            animate={{
              rotate: [0, -180, -360],
              scale: [1, 0.7, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-32 right-1/3 w-18 h-18 lg:w-24 lg:h-24 opacity-25"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 w-24 h-24 lg:w-32 lg:h-32 opacity-15"
            animate={{
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 4,
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 lg:w-24 lg:h-24 opacity-20"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 0.6, 1.2, 1],
              opacity: [0.1, 0.4, 0.1, 0.1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          >
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte & Bite Logo"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
              className="object-contain"
            />
          </motion.div>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-[#b65c25] rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-[#d97316] rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-2 h-2 bg-[#b65c25] rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>

      {/* Contact Form Section */}
      <div className="-mt-20">
        <ContactForm />
      </div>
    </div>
  );
}
