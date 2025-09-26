"use client";

import PhotographyModal from "@/components/ui/PhotographyModal";
import { CloudinaryResource } from "@/lib/cloudinary";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PhotographyGalleryProps {
  photos: CloudinaryResource[];
}

export default function PhotographyGallery({
  photos,
}: PhotographyGalleryProps) {
  const t = useTranslations("photography");
  const [selectedPhoto, setSelectedPhoto] = useState<CloudinaryResource | null>(
    null
  );
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [loadedPhotos, setLoadedPhotos] = useState<CloudinaryResource[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<number>(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  // Lazy loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedPhotos(photos.slice(0, visiblePhotos));
    }, 100);
    return () => clearTimeout(timer);
  }, [photos, visiblePhotos]);

  // Load more photos on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        setVisiblePhotos((prev) => Math.min(prev + 6, photos.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [photos.length]);

  // Handle photo selection
  const handlePhotoClick = (photo: CloudinaryResource, index: number) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  // Handle photo change in modal
  const handlePhotoChange = (newIndex: number) => {
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Generate random heights for masonry effect
  const getRandomHeight = (index: number) => {
    const heights = ["h-64", "h-80", "h-96", "h-72", "h-88"];
    return heights[index % heights.length];
  };

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
            {t("title")}
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

      {/* Masonry Gallery */}
      <div ref={containerRef} className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {loadedPhotos.map((photo, index) => {
              const heightClass = getRandomHeight(index);

              return (
                <motion.div
                  key={photo.public_id}
                  className={`cursor-pointer group ${heightClass}`}
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
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#b65c25] transition-all duration-300">
                    <Image
                      src={photo.secure_url}
                      alt={`Photography ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      priority={index < 4}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      {selectedPhoto && (
        <PhotographyModal
          photo={selectedPhoto}
          photos={photos}
          currentIndex={currentPhotoIndex}
          onClose={() => setSelectedPhoto(null)}
          onPhotoChange={handlePhotoChange}
        />
      )}
    </div>
  );
}
