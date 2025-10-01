import { readdir } from "fs/promises";
import { join } from "path";

// Media utilities for local file management
export interface MediaFile {
  id: string;
  filename: string;
  title: string;
  description?: string;
  category: "photography" | "web" | "videos" | "brand";
  type: "image" | "video";
  size?: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Generate local media URLs
export const getMediaUrl = (path: string): string => {
  return `/media/${path}`;
};

// Generate image URLs
export const getImageUrl = (
  filename: string,
  category: "photography" | "web" | "brand" = "photography",
  type: "original" | "thumbnail" = "original"
): string => {
  if (type === "thumbnail") {
    return getMediaUrl(`images/thumbnails/${filename}`);
  }
  return getMediaUrl(`images/${category}/${filename}`);
};

// Generate video URLs
export const getVideoUrl = (
  filename: string,
  category: "hero" | "portfolio" = "portfolio",
  type: "original" | "thumbnail" = "original"
): string => {
  if (type === "thumbnail") {
    return getMediaUrl(`videos/thumbnails/${filename}`);
  }
  return getMediaUrl(`videos/${category}/${filename}`);
};

// Generate asset URLs
export const getAssetUrl = (
  filename: string,
  type: "icons" | "logos" = "icons"
): string => {
  return getMediaUrl(`assets/${type}/${filename}`);
};

// Scan directory for media files
export async function scanDirectory(
  dirPath: string,
  category: string,
  type: "image" | "video"
): Promise<MediaFile[]> {
  try {
    const files = await readdir(dirPath);
    const mediaFiles: MediaFile[] = [];

    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm"];

    for (const file of files) {
      const ext = file.toLowerCase().substring(file.lastIndexOf("."));

      if (type === "image" && imageExtensions.includes(ext)) {
        mediaFiles.push({
          id: `${category}-${file.replace(ext, "")}`,
          filename: file,
          title: file
            .replace(ext, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          description: `${category} media file`,
          category: category as "photography" | "web" | "videos" | "brand",
          type: "image",
        });
      } else if (type === "video" && videoExtensions.includes(ext)) {
        mediaFiles.push({
          id: `${category}-${file.replace(ext, "")}`,
          filename: file,
          title: file
            .replace(ext, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          description: `${category} media file`,
          category: category as "photography" | "web" | "videos" | "brand",
          type: "video",
        });
      }
    }

    return mediaFiles;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

// Get all media from file system
export async function getAllMedia() {
  try {
    const [photography, web, videos] = await Promise.all([
      scanDirectory(
        join(process.cwd(), "public/media/images/photography"),
        "photography",
        "image"
      ),
      scanDirectory(
        join(process.cwd(), "public/media/images/web"),
        "web",
        "image"
      ),
      scanDirectory(
        join(process.cwd(), "public/media/videos/portfolio"),
        "videos",
        "video"
      ),
    ]);

    return {
      photography,
      web,
      videos,
    };
  } catch (error) {
    console.error("Error getting all media:", error);
    return {
      photography: [],
      web: [],
      videos: [],
    };
  }
}

// Get media with limit
export async function getMediaWithLimit(limit: number = 3) {
  const allMedia = await getAllMedia();

  return {
    photography: allMedia.photography.slice(0, limit),
    web: allMedia.web.slice(0, limit),
    videos: allMedia.videos.slice(0, limit),
  };
}

// Get media by category
export async function getMediaByCategory(
  category: "photography" | "web" | "videos"
) {
  const allMedia = await getAllMedia();
  return allMedia[category] || [];
}
