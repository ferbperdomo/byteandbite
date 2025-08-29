"use client";

import { CloudinaryResource } from "@/lib/cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";

interface MediaGridProps {
  media: CloudinaryResource[];
  onMediaClick: (media: CloudinaryResource) => void;
  category: "photos" | "videos" | "web";
  loading?: boolean;
  hasIntersected?: boolean;
}

export default function MediaGrid({
  media,
  onMediaClick,
  category,
  loading = false,
  hasIntersected = false,
}: MediaGridProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [itemLimit, setItemLimit] = useState(9);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateItemLimit = () => {
      setItemLimit(window.innerWidth < 768 ? 3 : 9);
    };

    updateItemLimit();
    window.addEventListener("resize", updateItemLimit);

    return () => window.removeEventListener("resize", updateItemLimit);
  }, []);

  const displayedMedia = media.slice(0, itemLimit);

  // Animate items by rows when they load
  useEffect(() => {
    if (!hasIntersected || loading || media.length === 0) return;

    // Clear previous animations
    setAnimatedItems(new Set());

    const itemsToShow = media.slice(0, itemLimit);
    const timeouts: NodeJS.Timeout[] = [];
    const itemsPerRow = window.innerWidth < 768 ? 1 : 3; // 1 on mobile, 3 on desktop

    itemsToShow.forEach((item, index) => {
      const row = Math.floor(index / itemsPerRow);
      const timeout = setTimeout(() => {
        setAnimatedItems((prev) => new Set([...prev, item.public_id]));
      }, row * 300); // Animate by row with 300ms delay between rows
      timeouts.push(timeout);
    });

    // Cleanup timeouts on unmount or dependency change
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [media, itemLimit, hasIntersected, loading]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-1 w-full max-w-full">
        <MediaSkeleton count={itemLimit} />
      </div>
    );
  }

  if (!media || media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          {category === "photos" && (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          {category === "videos" && (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {category === "web" && (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
            </svg>
          )}
        </div>
        <p className="text-xl">No {category} found</p>
        <p className="text-sm mt-2">Upload some {category} to see them here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-1 w-full max-w-full">
      {displayedMedia.map((item, index) => {
        const isAnimated = animatedItems.has(item.public_id);
        const isHovered = hoveredItem === item.public_id;

        return (
          <div
            key={item.public_id}
            className={`group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer aspect-[4/3] md:aspect-[3/2] ${
              isAnimated ? "animate-slide-in-up" : "opacity-0 translate-y-8"
            } ${
              isHovered
                ? "scale-110 rotate-1 shadow-2xl shadow-blue-500/20 transition-all duration-300"
                : "hover:scale-105 hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            }`}
            onClick={() => onMediaClick(item)}
            onMouseEnter={() => setHoveredItem(item.public_id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Image/Video Thumbnail */}
            <div className="relative w-full h-full">
              {item.resource_type === "video" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/w_400,h_400,c_fill,f_jpg/${item.public_id}.jpg`}
                    alt={`Video thumbnail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    priority={index === 0} // LCP optimization for first video
                  />
                  {/* Video Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l7-5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={item.secure_url}
                  alt={`${category} item`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  priority={index === 0}
                />
              )}
            </div>

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center transition-all duration-300 ${
                isHovered ? "opacity-100 backdrop-blur-sm" : "opacity-0"
              }`}
            >
              <div className="text-center text-white transform transition-transform duration-300">
                <div
                  className={`w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? "scale-110 rotate-12" : "scale-100"
                  }`}
                >
                  <svg
                    className="w-8 h-8 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium tracking-wider">VIEW</p>
              </div>
            </div>

            {/* Format Badge */}
            <div
              className={`absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded transition-all duration-300 ${
                isHovered ? "bg-blue-500/80 scale-105" : ""
              }`}
            >
              {item.format?.toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
