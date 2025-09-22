"use client";

import PhotographyModal from "@/components/ui/PhotographyModal";
import { CloudinaryResource } from "@/lib/cloudinary";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface WebGalleryProps {
  webImages: CloudinaryResource[];
}

export default function WebGallery({ webImages }: WebGalleryProps) {
  const t = useTranslations("web");
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<CloudinaryResource[]>([]);
  const [visibleImages, setVisibleImages] = useState<number>(8);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  // Lazy loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedImages(webImages.slice(0, visibleImages));
    }, 100);
    return () => clearTimeout(timer);
  }, [webImages, visibleImages]);

  // Load more images on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        setVisibleImages((prev) => Math.min(prev + 4, webImages.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [webImages.length]);

  // Handle image selection
  const handleImageClick = (image: CloudinaryResource, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // Handle image change in modal
  const handleImageChange = (newIndex: number) => {
    setCurrentImageIndex(newIndex);
    setSelectedImage(webImages[newIndex]);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#b65c25]/5 via-transparent to-[#b65c25]/5"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(182, 92, 37, 0.05) 0%, transparent 50%, rgba(182, 92, 37, 0.05) 100%)",
            "linear-gradient(135deg, rgba(182, 92, 37, 0.1) 0%, transparent 50%, rgba(182, 92, 37, 0.1) 100%)",
            "linear-gradient(45deg, rgba(182, 92, 37, 0.05) 0%, transparent 50%, rgba(182, 92, 37, 0.05) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Hero Section */}
      <motion.section
        ref={titleRef}
        className="relative z-10 pt-16 pb-12 text-center"
        initial={{ opacity: 0 }}
        animate={isTitleInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        style={{
          y: isTitleInView ? 0 : 50,
        }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Use index-based positioning to avoid hydration mismatch
            const positions = [
              { left: 10, top: 20 },
              { left: 30, top: 15 },
              { left: 50, top: 25 },
              { left: 70, top: 18 },
              { left: 90, top: 22 },
              { left: 15, top: 40 },
              { left: 35, top: 45 },
              { left: 55, top: 38 },
              { left: 75, top: 42 },
              { left: 85, top: 35 },
              { left: 20, top: 60 },
              { left: 40, top: 65 },
              { left: 60, top: 58 },
              { left: 80, top: 62 },
              { left: 95, top: 55 },
              { left: 25, top: 80 },
              { left: 45, top: 85 },
              { left: 65, top: 78 },
              { left: 85, top: 82 },
              { left: 5, top: 75 },
            ];
            const pos = positions[i] || { left: 50, top: 50 };
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#b65c25]/30 rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-8xl font-bold text-[#b65c25] mb-4 px-4 md:px-0 relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          whileInView={{
            y: [50, 0],
            opacity: [0, 1],
            transition: { duration: 0.8 },
          }}
        >
          <motion.span
            className="inline-block relative"
            animate={
              isTitleInView
                ? {
                    textShadow: [
                      "0 0 20px #b65c25",
                      "0 0 40px #b65c25",
                      "0 0 20px #b65c25",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t("hero.title")}
          </motion.span>

          {/* Light sweep effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={isTitleInView ? { x: "100%" } : {}}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          whileInView={{
            y: [30, 0],
            opacity: [0, 1],
            transition: { duration: 0.8, delay: 0.2 },
          }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 max-w-3xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          whileInView={{
            y: [30, 0],
            opacity: [0, 1],
            transition: { duration: 0.8, delay: 0.4 },
          }}
        >
          {t("hero.description")}
        </motion.p>

        {/* Floating particles around title */}
        {isTitleInView && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => {
              // Use index-based positioning to avoid hydration mismatch
              const positions = [
                { left: 25, top: 35 },
                { left: 35, top: 30 },
                { left: 45, top: 40 },
                { left: 55, top: 32 },
                { left: 65, top: 38 },
                { left: 30, top: 50 },
                { left: 40, top: 45 },
                { left: 50, top: 55 },
                { left: 60, top: 48 },
                { left: 70, top: 52 },
                { left: 28, top: 65 },
                { left: 38, top: 60 },
                { left: 48, top: 70 },
                { left: 58, top: 63 },
                { left: 68, top: 67 },
                { left: 32, top: 80 },
                { left: 42, top: 75 },
                { left: 52, top: 85 },
                { left: 62, top: 78 },
                { left: 72, top: 82 },
              ];
              const pos = positions[i] || { left: 50, top: 50 };
              return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#b65c25] rounded-full"
                style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3 + (i % 3),
                  repeat: Infinity,
                    delay: i * 0.3,
                }}
              />
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Components Section */}
      <ComponentsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Portfolio Section */}
      <PortfolioSection
        webImages={loadedImages}
        onImageClick={handleImageClick}
      />

      {/* Modal */}
      {selectedImage && (
        <PhotographyModal
          photo={selectedImage}
          photos={webImages}
          currentIndex={currentImageIndex}
          onClose={() => setSelectedImage(null)}
          onPhotoChange={handleImageChange}
        />
      )}
    </div>
  );
}

// Benefits Section Component
function BenefitsSection() {
  const t = useTranslations("web.benefits");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const benefits = [
    {
      title: t("speed.title"),
      description: t("speed.description"),
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t("security.title"),
      description: t("security.description"),
      icon: "🛡️",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("mobile.title"),
      description: t("mobile.description"),
      icon: "📱",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("seo.title"),
      description: t("seo.description"),
      icon: "🔍",
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group relative h-64"
              initial={{ y: 50, opacity: 0 }}
              animate={
                isInView
                  ? {
                      y: 0,
                      opacity: 1,
                      scale: [1, 1.02, 1],
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: index * 0.5,
                },
              }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileInView={{
                y: [50, 0],
                opacity: [0, 1],
                scale: [0.9, 1],
                transition: { duration: 0.6, delay: index * 0.1 },
              }}
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-[#b65c25] transition-all duration-300 h-full flex flex-col justify-center group-hover:shadow-2xl group-hover:shadow-[#b65c25]/20 md:group-hover:scale-105">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: index * 0.3,
                      },
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Components Section Component
function ComponentsSection() {
  const t = useTranslations("web.components");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 bg-gray-900/30"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300 mb-6">{t("subtitle")}</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Interactive Component Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <ModernButton />
            <FloatingCard />
            <GradientInput />
            <MorphingIcon />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#b65c25]/20 to-transparent rounded-2xl p-8 border border-[#b65c25]/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Modern UI Components
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#b65c25] rounded-full mr-3 animate-pulse"></span>
                  Glassmorphism Effects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#b65c25] rounded-full mr-3 animate-pulse"></span>
                  Morphing Animations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#b65c25] rounded-full mr-3 animate-pulse"></span>
                  Interactive Gradients
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#b65c25] rounded-full mr-3 animate-pulse"></span>
                  Floating Elements
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Process Section Component
function ProcessSection() {
  const t = useTranslations("web.process");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const processSteps = [
    {
      title: t("consultation.title"),
      description: t("consultation.description"),
      icon: "💬",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("design.title"),
      description: t("design.description"),
      icon: "🎨",
      color: "from-purple-500 to-violet-500",
    },
    {
      title: t("development.title"),
      description: t("development.description"),
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("launch.title"),
      description: t("launch.description"),
      icon: "🚀",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t("subtitle")}
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            {t("description")}
          </p>
      </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative"
              initial={{ y: 50, opacity: 0 }}
              animate={
                isInView
                  ? {
                      y: 0,
                      opacity: 1,
                      scale: [1, 1.02, 1],
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: index * 0.5,
                },
              }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileInView={{
                y: [50, 0],
                opacity: [0, 1],
                scale: [0.9, 1],
                transition: { duration: 0.6, delay: index * 0.1 },
              }}
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-[#b65c25] transition-all duration-300 h-full md:group-hover:scale-105">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: index * 0.3,
                      },
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Portfolio Section Component
function PortfolioSection({
  webImages,
  onImageClick,
}: {
  webImages: CloudinaryResource[];
  onImageClick: (image: CloudinaryResource, index: number) => void;
}) {
  const t = useTranslations("web.portfolio");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 bg-gray-900/30"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
        <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300">{t("subtitle")}</p>
        </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webImages.map((image, index) => (
                <motion.div
                  key={image.public_id}
                  className="cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
              onClick={() => onImageClick(image, index)}
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#b65c25] transition-all duration-300">
                    <Image
                      src={image.secure_url}
                      alt="Web Development Project"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-[#b65c25] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none opacity-100 group-hover:opacity-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/20 to-transparent blur-sm" />
                    </div>
                  </div>
                </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Modern Interactive Components
function ModernButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative px-8 py-4 bg-gradient-to-r from-[#b65c25] to-[#d97316] text-white rounded-2xl font-semibold overflow-hidden shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(182, 92, 37, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      // Mobile animations
      animate={{
        boxShadow: [
          "0 10px 20px rgba(182, 92, 37, 0.2)",
          "0 20px 40px rgba(182, 92, 37, 0.4)",
          "0 10px 20px rgba(182, 92, 37, 0.2)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#d97316] to-[#b65c25]"
        animate={{
          opacity: isHovered ? 1 : [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: isHovered ? 0.3 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shimmer effect - always running on mobile */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles - always visible on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: "25%", top: "35%" },
          { left: "45%", top: "60%" },
          { left: "65%", top: "40%" },
          { left: "35%", top: "50%" },
          { left: "55%", top: "45%" },
          { left: "75%", top: "55%" },
        ].map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        ))}
      </div>

      <span className="relative z-10">✨ Modern Button</span>
    </motion.button>
  );
}

function FloatingCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 cursor-pointer shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
      }}
      style={{ transformStyle: "preserve-3d" }}
      // Mobile animations
      animate={{
        y: [0, -5, 0],
        rotateX: [0, 2, 0],
        rotateY: [0, 2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glassmorphism background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#b65c25]/20 via-transparent to-[#d97316]/20 rounded-2xl"
        animate={{
          opacity: isHovered ? 1 : [0.3, 0.7, 0.3],
          background: isHovered
            ? "linear-gradient(135deg, rgba(182, 92, 37, 0.3), rgba(217, 115, 22, 0.3))"
            : [
                "linear-gradient(135deg, rgba(182, 92, 37, 0.1), rgba(217, 115, 22, 0.1))",
                "linear-gradient(135deg, rgba(182, 92, 37, 0.2), rgba(217, 115, 22, 0.2))",
                "linear-gradient(135deg, rgba(182, 92, 37, 0.1), rgba(217, 115, 22, 0.1))",
              ],
        }}
        transition={{
          duration: isHovered ? 0.3 : 5,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orbs - always visible on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-20 h-20 bg-[#b65c25]/20 rounded-full blur-xl"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ top: "20%", left: "20%" }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-[#d97316]/20 rounded-full blur-xl"
          animate={{
            x: [0, -15, 25, 0],
            y: [0, 20, -5, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          style={{ bottom: "20%", right: "20%" }}
        />
      </div>

      <div className="relative z-10">
        <motion.h3
          className="text-white font-bold mb-2 text-lg"
          animate={{
            color: isHovered ? "#fbbf24" : ["#ffffff", "#fbbf24", "#ffffff"],
          }}
          transition={{
            duration: isHovered ? 0.3 : 3,
            repeat: isHovered ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          🚀 Floating Card
        </motion.h3>
        <p className="text-gray-300 text-sm">Glassmorphism + 3D effects</p>
      </div>
    </motion.div>
  );
}

function GradientInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isFocused ? 1.02 : [1, 1.01, 1],
        y: isFocused ? -2 : [0, -1, 0],
      }}
      transition={{
        duration: isFocused ? 0.3 : 3,
        repeat: isFocused ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        {/* Gradient border */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#b65c25] via-[#d97316] to-[#f59e0b] rounded-xl p-[2px]"
          animate={{
            opacity: isFocused ? 1 : [0.3, 0.6, 0.3],
            scale: isFocused ? 1.02 : [1, 1.01, 1],
          }}
          transition={{
            duration: isFocused ? 0.3 : 4,
            repeat: isFocused ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gray-900 rounded-lg" />
        </motion.div>

        <input
          type="text"
          placeholder="✨ Gradient Input"
          className="relative w-full px-4 py-3 bg-gray-900/80 backdrop-blur-sm border-0 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Animated underline - always pulsing on mobile */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#b65c25] to-[#f59e0b] rounded-full"
          animate={{
            width: isFocused ? "100%" : ["0%", "30%", "0%"],
            opacity: isFocused ? 1 : [0, 0.7, 0],
          }}
          transition={{
            duration: isFocused ? 0.4 : 2.5,
            repeat: isFocused ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating label effect - auto show on mobile */}
        <motion.div
          className="absolute -top-2 left-3 px-2 bg-gray-900 text-[#b65c25] text-xs font-medium"
          animate={{
            opacity: isFocused ? 1 : [0, 0.8, 0],
            y: isFocused ? 0 : [10, 0, 10],
          }}
          transition={{
            duration: isFocused ? 0.2 : 3,
            repeat: isFocused ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          Enter text
        </motion.div>
      </div>
    </motion.div>
  );
}

function MorphingIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-16 h-16 mx-auto cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.2 }}
      // Mobile animations
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Background circle */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#b65c25] to-[#d97316] rounded-full"
        animate={{
          rotate: isHovered ? 360 : [0, 180, 360],
          scale: isHovered ? 1.1 : [1, 1.05, 1],
        }}
        transition={{
          duration: isHovered ? 0.6 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Morphing icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-white text-2xl"
        animate={{
          rotate: isHovered ? -360 : [0, -180, -360],
        }}
        transition={{
          duration: isHovered ? 0.6 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {isHovered ? "⚡" : "💫"}
        </motion.span>
      </motion.div>

      {/* Pulsing rings - always visible on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-[#b65c25]/30 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
    </div>
    </motion.div>
  );
}
