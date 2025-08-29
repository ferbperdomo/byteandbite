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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
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

        {/* Media Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {media.public_id.split("/").pop()}
              </h3>
              <div className="flex space-x-4 text-sm text-gray-300">
                <span>{media.format?.toUpperCase()}</span>
                <span>
                  {media.width} × {media.height}
                </span>
                <span>{media.resource_type}</span>
              </div>
            </div>

            {/* Download Button */}
            <a
              href={media.secure_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
