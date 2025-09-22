"use client";

import { CloudinaryResource } from "@/lib/cloudinary";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoModalProps {
  video: CloudinaryResource;
  videos: CloudinaryResource[];
  currentIndex: number;
  onClose: () => void;
  onVideoChange: (index: number) => void;
}

export default function VideoModal({
  video,
  videos,
  currentIndex,
  onClose,
  onVideoChange,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMobileArrows, setShowMobileArrows] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    onVideoChange(prevIndex);
  }, [currentIndex, videos.length, onVideoChange]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    onVideoChange(nextIndex);
  }, [currentIndex, videos.length, onVideoChange]);

  // Show mobile arrows and set timeout to hide them
  const showMobileArrowsWithTimeout = useCallback(() => {
    setShowMobileArrows(true);

    // Clear existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // Set new timeout to hide arrows after 3 seconds
    hideTimeoutRef.current = setTimeout(() => {
      setShowMobileArrows(false);
    }, 3000);
  }, []);

  // Handle video interaction (tap/click) to show arrows
  const handleVideoInteraction = useCallback(() => {
    showMobileArrowsWithTimeout();
  }, [showMobileArrowsWithTimeout]);

  // Show arrows when video changes
  useEffect(() => {
    showMobileArrowsWithTimeout();
  }, [currentIndex, showMobileArrowsWithTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, handlePrevious, handleNext]);

  // Show arrows when video changes and handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Show arrows when video changes
    showMobileArrowsWithTimeout();

    const handlePlay = () => {
      showMobileArrowsWithTimeout();
    };

    const handlePause = () => {
      showMobileArrowsWithTimeout();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [video, showMobileArrowsWithTimeout]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleClose}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-8 right-8 z-10 text-[#b65c25] hover:text-[#d97316] transition-colors duration-300"
          onClick={handleClose}
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

        {/* Navigation arrows - Desktop only */}
        {videos.length > 1 && (
          <>
            {/* Previous button */}
            <motion.button
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 text-[#b65c25] hover:text-[#d97316] transition-all duration-300 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full p-4 hidden md:block"
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
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 text-[#b65c25] hover:text-[#d97316] transition-all duration-300 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full p-4 hidden md:block"
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

        {/* Video container */}
        <motion.div
          className="relative max-w-7xl max-h-[90vh] mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          onClick={(e) => {
            e.stopPropagation();
            handleVideoInteraction();
          }}
        >
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={video.secure_url}
              className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              loop
              playsInline
              onClick={handleVideoInteraction}
            />

            {/* Mobile navigation arrows - only the arrows are clickable */}
            {videos.length > 1 && (
              <div
                className={`absolute inset-0 pointer-events-none md:hidden transition-opacity duration-300 ${
                  showMobileArrows ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Previous arrow - only the arrow is clickable */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="w-16 h-16 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full flex items-center justify-center transition-all duration-300"
                    title="Previous video"
                  >
                    <svg
                      className="w-8 h-8 text-[#b65c25]"
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
                  </button>
                </div>

                {/* Next arrow - only the arrow is clickable */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-16 h-16 bg-[#b65c25]/20 hover:bg-[#b65c25]/30 rounded-full flex items-center justify-center transition-all duration-300"
                    title="Next video"
                  >
                    <svg
                      className="w-8 h-8 text-[#b65c25]"
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
                  </button>
                </div>
              </div>
            )}

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
