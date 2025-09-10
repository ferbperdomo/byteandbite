"use client";

import MediaGrid from "@/components/ui/MediaGrid";
import MediaModal from "@/components/ui/MediaModal";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CloudinaryResource } from "@/lib/cloudinary";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type MediaCategory = "photos" | "videos" | "web";

interface MediaData {
  photos: CloudinaryResource[];
  videos: CloudinaryResource[];
  web: CloudinaryResource[];
}

export default function Gallery() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("photos");
  const [mediaData, setMediaData] = useState<MediaData>({
    photos: [],
    videos: [],
    web: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<CloudinaryResource | null>(
    null
  );

  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (!hasIntersected) return;

    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/media");
        if (!response.ok) {
          throw new Error("Failed to fetch media");
        }
        const data = await response.json();
        setMediaData(data);
      } catch (error) {
        console.error("❌ Cliente: Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [hasIntersected]);

  const categories: Array<{
    id: MediaCategory;
    label: string;
    icon: React.ReactElement;
  }> = [
    {
      id: "photos" as MediaCategory,
      label: t("photos"),
      icon: (
        <svg
          className="w-6 h-6 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: "videos" as MediaCategory,
      label: t("videos"),
      icon: (
        <svg
          className="w-6 h-6 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4"
          />
        </svg>
      ),
    },
    // {
    //   id: "web" as MediaCategory,
    //   label: t("web"),
    //   icon: (
    //     <svg
    //       className="w-6 h-6"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
    //       />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <section
      id="gallery"
      ref={ref}
      className={`bg-black text-white overflow-hidden mb-24 h-[80vh] ${
        hasIntersected
          ? "animate-gallery-slide-in"
          : "opacity-0 translate-y-10 scale-98"
      }`}
    >
      <div className="flex h-full overflow-hidden overflow-x-hidden">
        <div
          className={`w-16 md:w-64 bg-black p-3 md:p-6 transition-all duration-500 delay-200 ease-out flex-shrink-0 ${
            hasIntersected
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="mb-8">
            <h2
              className={`hidden md:block text-2xl font-bold text-[#b65c25] mb-6 transition-all duration-400 delay-300 ease-out ${
                hasIntersected
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              Gallery
            </h2>

            <nav className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-center md:justify-start space-x-0 md:space-x-3 px-2 md:px-4 py-3 rounded-lg text-left transition-all duration-500 ease-out group ${
                    activeCategory === category.id
                      ? "bg-[#b65c25] text-white shadow-lg shadow-[#b65c25]/20"
                      : "text-gray-400 hover:text-[#b65c25] hover:bg-[#b65c25]/10 hover:shadow-md hover:shadow-[#b65c25]/10"
                  } ${
                    hasIntersected
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                  style={{ transitionDelay: `${200 + index * 50}ms` }}
                  title={category.label}
                >
                  <span
                    className={`text-xl transition-all duration-300 ${
                      activeCategory === category.id
                        ? "text-white scale-110"
                        : "group-hover:text-[#b65c25] group-hover:scale-110"
                    }`}
                  >
                    {category.icon}
                  </span>
                  <span className="hidden md:block font-medium transition-colors duration-300">
                    {category.label}
                  </span>
                  <span
                    className={`hidden md:block ml-auto text-sm transition-colors duration-300 ${
                      activeCategory === category.id
                        ? "text-white/80"
                        : "text-gray-500 group-hover:text-[#b65c25]/70"
                    }`}
                  >
                    {mediaData[category.id]?.length || 0}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:block mt-auto pt-6 border-t border-gray-800">
            <div className="text-sm text-gray-400">
              <p>Total items: {Object.values(mediaData).flat().length}</p>
              <p className="mt-1">
                Category:{" "}
                {categories.find((c) => c.id === activeCategory)?.label}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-500 delay-300 ease-out ${
            hasIntersected
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          }`}
        >
          <div className="flex-1 px-2 py-2 overflow-y-auto">
            <MediaGrid
              media={mediaData[activeCategory] || []}
              onMediaClick={setSelectedMedia}
              category={activeCategory}
              loading={loading}
              hasIntersected={hasIntersected}
            />
          </div>
        </div>
      </div>

      {selectedMedia && (
        <MediaModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </section>
  );
}
