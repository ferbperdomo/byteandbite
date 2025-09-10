"use client";

import MediaModal from "@/components/ui/MediaModal";
import { CloudinaryResource } from "@/lib/cloudinary";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface WebGalleryProps {
  webImages: CloudinaryResource[];
}

export default function WebGallery({ webImages }: WebGalleryProps) {
  // const t = useTranslations("web");
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(
    null
  );
  const [loadedImages, setLoadedImages] = useState<CloudinaryResource[]>([]);
  const [visibleImages, setVisibleImages] = useState<number>(8);
  const containerRef = useRef<HTMLDivElement>(null);
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
      {/* Animated Title */}
      <motion.div
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
            Web Development
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
      </motion.div>

      {/* Web Gallery */}
      <div ref={containerRef} className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadedImages.map((image, index) => {
              return (
                <motion.div
                  key={image.public_id}
                  className="cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#b65c25] transition-all duration-300">
                    <Image
                      src={image.secure_url}
                      alt="Web Development Project"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay */}
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

                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/20 to-transparent blur-sm" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

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
