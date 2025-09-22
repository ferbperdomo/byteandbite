"use client";

import { CloudinaryResource } from "@/lib/cloudinary";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface PhotographyModalProps {
  photo: CloudinaryResource;
  photos: CloudinaryResource[];
  currentIndex: number;
  onClose: () => void;
  onPhotoChange: (index: number) => void;
}

export default function PhotographyModal({
  photo,
  photos,
  currentIndex,
  onClose,
  onPhotoChange,
}: PhotographyModalProps) {
  const [showMobileArrows, setShowMobileArrows] = useState(false);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onPhotoChange(prevIndex);
  }, [currentIndex, photos.length, onPhotoChange]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onPhotoChange(nextIndex);
  }, [currentIndex, photos.length, onPhotoChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrevious, handleNext]);

  // Show mobile arrows on tap
  const handleImageTap = () => {
    setShowMobileArrows(true);
  };

  // Show arrows when photo changes
  useEffect(() => {
    setShowMobileArrows(true);
  }, [photo]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-8 right-8 z-10 text-[#b65c25] hover:text-[#d97316] transition-colors duration-300"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        {/* Navigation arrows */}
        {photos.length > 1 && (
          <>
            {/* Previous button */}
            <motion.button
              className={`absolute left-8 top-1/2 -translate-y-1/2 z-10 text-[#b65c25] hover:text-[#d97316] transition-colors duration-300 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full p-4 ${
                showMobileArrows
                  ? "md:block"
                  : "hidden md:block pointer-events-none"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Next button */}
            <motion.button
              className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 text-[#b65c25] hover:text-[#d97316] transition-colors duration-300 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full p-4 ${
                showMobileArrows
                  ? "md:block"
                  : "hidden md:block pointer-events-none"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}

        {/* Photo container */}
        <motion.div
          className="relative max-w-7xl max-h-[90vh] mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          onClick={(e) => {
            e.stopPropagation();
            handleImageTap();
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={photo.secure_url}
              alt="Photography"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh] w-auto mx-auto rounded-lg shadow-2xl"
              priority
            />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/10 to-transparent blur-3xl -z-10" />
          </div>
        </motion.div>

        {/* Background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#b65c25] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
