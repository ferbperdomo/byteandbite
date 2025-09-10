"use client";

import { CloudinaryResource } from "@/lib/cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface MediaModalProps {
  media: CloudinaryResource;
  onClose: () => void;
}

export default function MediaModal({ media, onClose }: MediaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    // Pause video if it exists
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-6">
      <div
        ref={modalRef}
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          title="Close modal"
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
        >
          <svg
            className="w-6 h-6"
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
        </button>

        {/* Media Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {media.resource_type === "video" ? (
            <video
              ref={videoRef}
              src={media.secure_url}
              controls
              autoPlay
              className="max-w-[85vw] max-h-[85vh] object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative max-w-full max-h-full">
              <Image
                src={media.secure_url}
                alt="Full size media"
                width={media.width}
                height={media.height}
                className="object-contain max-w-full max-h-[90vh]"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
