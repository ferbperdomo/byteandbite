"use client";

import MediaModal from "@/components/ui/MediaModal";
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

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={titleRef}
        className="relative z-10 pt-16 pb-12 text-center"
        initial={{ opacity: 0 }}
        animate={isTitleInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-8xl font-bold text-[#b65c25] mb-4 px-4 md:px-0 relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
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
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 max-w-3xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* Floating particles around title */}
        {isTitleInView && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#b65c25] rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Components Section */}
      <ComponentsSection />

      {/* Animations Section */}
      <AnimationsSection />

      {/* Architecture Section */}
      <ArchitectureSection />

      {/* Database Section */}
      <DatabaseSection />

      {/* Portfolio Section */}
      <PortfolioSection
        webImages={loadedImages}
        onImageClick={setSelectedImage}
      />

      {/* Modal */}
      {selectedImage && (
        <MediaModal
          media={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

// Technologies Section Component
function TechnologiesSection() {
  const t = useTranslations("web.technologies");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const technologies = [
    {
      key: "frontend",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "backend",
      icon: "🔧",
      color: "from-green-500 to-emerald-500",
    },
    {
      key: "database",
      icon: "🗄️",
      color: "from-purple-500 to-violet-500",
    },
    {
      key: "deployment",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
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
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.key}
              className="group relative h-64"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-[#b65c25] transition-all duration-300 h-full flex flex-col justify-center">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(`${tech.key}.title`)}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {t(`${tech.key}.description`)}
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

// Animations Section Component
function AnimationsSection() {
  const t = useTranslations("web.animations");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-black via-gray-800 to-black"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1 - Slow moving */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#b65c25]/5 to-transparent"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Layer 2 - Medium moving */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-[#d97316]/3 to-transparent"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Layer 3 - Fast moving */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/2 to-transparent"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#b65c25] to-white bg-clip-text text-transparent mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Premium Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Parallax Layers Demo */}
          <ParallaxLayersDemo isInView={isInView} />

          {/* Neumorphism Demo */}
          <NeumorphismDemo isInView={isInView} />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Animated Icons Demo */}
          <AnimatedIconsDemo isInView={isInView} />

          {/* Reveal Animations Demo */}
          <RevealAnimationsDemo isInView={isInView} />

          {/* Gravity Effects Demo */}
          <GravityEffectsDemo isInView={isInView} />
        </div>
      </div>
    </motion.section>
  );
}

// Architecture Section Component
function ArchitectureSection() {
  const t = useTranslations("web.architecture");
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

        <ArchitectureDiagram />
      </div>
    </motion.section>
  );
}

// Database Section Component
function DatabaseSection() {
  const t = useTranslations("web.database");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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
          <p className="text-xl text-gray-300 mb-6">{t("subtitle")}</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <DatabaseVisualization />
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
  onImageClick: (image: CloudinaryResource) => void;
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
              onClick={() => onImageClick(image)}
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

// Parallax Layers Component
function ParallaxLayersDemo({ isInView }: { isInView: boolean }) {
  const t = useTranslations("web.animations.parallax");

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.4 }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{t("title")}</h3>
      <p className="text-gray-300 mb-6">{t("description")}</p>

      <div className="relative h-56 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden">
        {/* Background Layer - Slowest */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#b65c25]/20 to-[#d97316]/10 rounded-2xl"
          animate={{
            x: [0, 8, 0],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Layer - Medium */}
        <motion.div
          className="absolute inset-6 bg-gradient-to-tr from-[#d97316]/30 to-[#f59e0b]/20 rounded-xl"
          animate={{
            x: [0, -6, 0],
            y: [0, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Foreground Layer - Fastest */}
        <motion.div
          className="absolute inset-12 bg-gradient-to-bl from-[#f59e0b]/40 to-[#b65c25]/30 rounded-lg"
          animate={{
            x: [0, 5, 0],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-4 right-4 w-4 h-4 bg-[#b65c25] rounded-full"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-3 h-3 bg-[#d97316] rounded-full"
          animate={{
            y: [0, 8, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

// Neumorphism Component
function NeumorphismDemo({ isInView }: { isInView: boolean }) {
  const [isPressed, setIsPressed] = useState(false);
  const t = useTranslations("web.animations.neumorphism");

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      whileHover={{ scale: 1.02, rotateY: -2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{t("title")}</h3>
      <p className="text-gray-300 mb-6">{t("description")}</p>

      <div className="flex justify-center items-center h-64">
        <motion.div
          className="relative"
          onTapStart={() => setIsPressed(true)}
          onTap={() => setIsPressed(false)}
        >
          {/* Main Neumorphic Button */}
          <motion.div
            className="w-32 h-32 rounded-3xl flex items-center justify-center cursor-pointer"
            style={{
              background: isPressed
                ? "linear-gradient(145deg, #2a2a2a, #3a3a3a)"
                : "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
              boxShadow: isPressed
                ? "inset 8px 8px 16px #1a1a1a, inset -8px -8px 16px #4a4a4a"
                : "8px 8px 16px #1a1a1a, -8px -8px 16px #4a4a4a",
            }}
            animate={{
              scale: isPressed ? 0.95 : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: isPressed
                  ? "linear-gradient(145deg, #2a2a2a, #3a3a3a)"
                  : "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
                boxShadow: isPressed
                  ? "inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #4a4a4a"
                  : "4px 4px 8px #1a1a1a, -4px -4px 8px #4a4a4a",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#b65c25] to-[#d97316] rounded-lg"></div>
            </motion.div>
          </motion.div>

          {/* Floating Neumorphic Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
            style={{
              background: "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
              boxShadow: "4px 4px 8px #1a1a1a, -4px -4px 8px #4a4a4a",
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full"
            style={{
              background: "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
              boxShadow: "3px 3px 6px #1a1a1a, -3px -3px 6px #4a4a4a",
            }}
            animate={{
              y: [0, 8, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Animated Icons Component
function AnimatedIconsDemo({ isInView }: { isInView: boolean }) {
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = ["⚡", "🔥", "💎", "🚀"];
  const t = useTranslations("web.animations.animatedIcons");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.8 }}
      whileHover={{ scale: 1.02, rotateX: 5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-xl font-bold text-white mb-4">{t("title")}</h3>
      <p className="text-gray-300 mb-6">{t("description")}</p>

      <div className="flex justify-center items-center h-56">
        <motion.div
          className="relative w-32 h-32 flex items-center justify-center"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-5xl"
              animate={{
                scale: activeIcon === index ? [1, 1.8, 1] : 0,
                opacity: activeIcon === index ? 1 : 0,
                rotate: activeIcon === index ? [0, 360] : 0,
                z: activeIcon === index ? 10 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Wave Animations Component
function RevealAnimationsDemo({ isInView }: { isInView: boolean }) {
  const [revealIndex, setRevealIndex] = useState(0);
  const t = useTranslations("web.animations.revealAnimations");
  const revealElements = [
    { text: t("slideIn"), effect: "slide" },
    { text: t("fadeIn"), effect: "fade" },
    { text: t("scaleIn"), effect: "scale" },
    { text: t("rotateIn"), effect: "rotate" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 1 }}
      whileHover={{ scale: 1.02, rotateX: -5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-xl font-bold text-white mb-4">{t("title")}</h3>
      <p className="text-gray-300 mb-6">{t("description")}</p>

      <div className="relative h-56 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden flex items-center justify-center">
        {revealElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              opacity: 0,
              x: element.effect === "slide" ? -100 : 0,
              y: element.effect === "slide" ? 0 : 50,
              scale: element.effect === "scale" ? 0 : 1,
              rotate: element.effect === "rotate" ? -180 : 0,
            }}
            animate={{
              opacity: revealIndex === index ? 1 : 0,
              x:
                revealIndex === index
                  ? 0
                  : element.effect === "slide"
                  ? -100
                  : 0,
              y:
                revealIndex === index ? 0 : element.effect === "slide" ? 0 : 50,
              scale:
                revealIndex === index ? 1 : element.effect === "scale" ? 0 : 1,
              rotate:
                revealIndex === index
                  ? 0
                  : element.effect === "rotate"
                  ? -180
                  : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div className="bg-gradient-to-r from-[#b65c25] to-[#d97316] text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg">
              {element.text}
            </div>
          </motion.div>
        ))}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 bg-[#b65c25] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 bg-[#d97316] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Gravity Effects Component
function GravityEffectsDemo({ isInView }: { isInView: boolean }) {
  const [isDropping, setIsDropping] = useState(false);
  const t = useTranslations("web.animations.gravityEffects");

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 1.2 }}
      whileHover={{ scale: 1.02, rotateX: 5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-xl font-bold text-white mb-4">{t("title")}</h3>
      <p className="text-gray-300 mb-6">{t("description")}</p>

      <div
        className="relative h-56 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => setIsDropping(!isDropping)}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#b65c25] to-[#d97316]"></div>

        {/* Falling Elements */}
        <motion.div
          className="absolute top-4 left-1/2 w-6 h-6 bg-[#b65c25] rounded-full"
          animate={{
            y: isDropping ? [0, 180, 160, 180, 170, 180] : 0,
            rotate: isDropping ? [0, 360, 720, 1080] : 0,
          }}
          transition={{
            duration: 2,
            ease: "easeIn",
            repeat: isDropping ? Infinity : 0,
          }}
        />

        <motion.div
          className="absolute top-8 left-1/3 w-4 h-4 bg-[#d97316] rounded-full"
          animate={{
            y: isDropping ? [0, 200, 180, 200, 190, 200] : 0,
            rotate: isDropping ? [0, -360, -720] : 0,
          }}
          transition={{
            duration: 1.8,
            ease: "easeIn",
            repeat: isDropping ? Infinity : 0,
            delay: 0.2,
          }}
        />

        <motion.div
          className="absolute top-6 right-1/3 w-5 h-5 bg-[#f59e0b] rounded-full"
          animate={{
            y: isDropping ? [0, 190, 170, 190, 180, 190] : 0,
            rotate: isDropping ? [0, 180, 360, 540] : 0,
          }}
          transition={{
            duration: 1.6,
            ease: "easeIn",
            repeat: isDropping ? Infinity : 0,
            delay: 0.4,
          }}
        />

        {/* Bounce Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs"
          animate={{
            opacity: isDropping ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{
            duration: 1,
            repeat: isDropping ? Infinity : 0,
          }}
        >
          Click to drop!
        </motion.div>
      </div>
    </motion.div>
  );
}

function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ArchitectureLayer
          title="Frontend"
          color="from-blue-500 to-cyan-500"
          delay={0.6}
        />
        <ArchitectureLayer
          title="Backend"
          color="from-green-500 to-emerald-500"
          delay={0.8}
        />
        <ArchitectureLayer
          title="Database"
          color="from-purple-500 to-violet-500"
          delay={1.0}
        />
      </div>
    </motion.div>
  );
}

function ArchitectureLayer({
  title,
  color,
  delay,
}: {
  title: string;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <div className={`relative bg-gradient-to-br ${color} p-6 rounded-xl`}>
        <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
        <div className="space-y-2">
          <div className="h-2 bg-white/30 rounded"></div>
          <div className="h-2 bg-white/20 rounded w-3/4"></div>
          <div className="h-2 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    </motion.div>
  );
}

function DatabaseVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DatabaseCard title="PostgreSQL" icon="🐘" delay={0.6} />
        <DatabaseCard title="MongoDB" icon="🍃" delay={0.8} />
        <DatabaseCard title="Redis" icon="🔴" delay={1.0} />
        <DatabaseCard title="Cloud Storage" icon="☁️" delay={1.2} />
      </div>
    </motion.div>
  );
}

function DatabaseCard({
  title,
  icon,
  delay,
}: {
  title: string;
  icon: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#b65c25] transition-all duration-300"
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-center">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
}
