"use client";

import VideoModal from "@/components/ui/VideoModal";
import { CloudinaryResource } from "@/lib/cloudinary";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface VideoGalleryProps {
  videos: CloudinaryResource[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const t = useTranslations("videos");
  const [selectedVideo, setSelectedVideo] = useState<CloudinaryResource | null>(
    null
  );
  const [loadedVideos, setLoadedVideos] = useState<CloudinaryResource[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<number>(8);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  // Lazy loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedVideos(videos.slice(0, visibleVideos));
    }, 100);
    return () => clearTimeout(timer);
  }, [videos, visibleVideos]);

  // Load more videos on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        setVisibleVideos((prev) => Math.min(prev + 4, videos.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videos.length]);

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

      {/* Video Gallery */}
      <div ref={containerRef} className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loadedVideos.map((video, index) => {
              return (
                <motion.div
                  key={video.public_id}
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
                  onClick={() => setSelectedVideo(video)}
                >
                  <div
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#b65c25] transition-all duration-300"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.play().catch(() => {});
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }}
                  >
                    <video
                      src={video.secure_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* Play button overlay - hidden on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-[#b65c25] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none opacity-100 group-hover:opacity-0">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
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
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
