"use client";

import { CloudinaryResource } from "@/lib/cloudinary";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface MediaModalProps {
  media: CloudinaryResource;
  onClose: () => void;
}

export default function MediaModal({ media, onClose }: MediaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
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
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-6">
      <div
        ref={modalRef}
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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
              src={media.secure_url}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: "85vh", maxWidth: "85vw" }}
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
