import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: "image" | "video";
  width: number;
  height: number;
  created_at: string;
  folder: string;
}

// Get images from a specific folder with optional limit
export async function getImagesByFolder(
  folder: string,
  limit?: number
): Promise<CloudinaryResource[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder} AND resource_type:image`)
      .sort_by("created_at", "desc")
      .max_results(limit || 100)
      .execute();

    return result.resources;
  } catch (error) {
    console.error(`Error fetching images from ${folder}:`, error);
    return [];
  }
}

// Get videos from a specific folder with optional limit
export async function getVideosByFolder(
  folder: string,
  limit?: number
): Promise<CloudinaryResource[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder} AND resource_type:video`)
      .sort_by("created_at", "desc")
      .max_results(limit || 100)
      .execute();

    return result.resources;
  } catch (error) {
    console.error(`Error fetching videos from ${folder}:`, error);
    return [];
  }
}

// Get all media by category (for Gallery - no limit)
export async function getAllMediaByCategory() {
  try {
    const [photos, web, videoFiles] = await Promise.all([
      getImagesByFolder("images"),
      getImagesByFolder("web"),
      getVideosByFolder("videos"),
    ]);

    return {
      photos,
      videos: videoFiles,
      web,
    };
  } catch (error) {
    console.error("❌ Error fetching media from Cloudinary:", error);
    return {
      photos: [],
      videos: [],
      web: [],
    };
  }
}

// Get media by category with limit (for ServicesSection)
export async function getMediaByCategoryWithLimit(limit: number = 3) {
  try {
    const [photos, web, videoFiles] = await Promise.all([
      getImagesByFolder("images", limit),
      getImagesByFolder("web", limit),
      getVideosByFolder("videos", limit),
    ]);

    return {
      photos,
      videos: videoFiles,
      web,
    };
  } catch (error) {
    console.error("❌ Error fetching limited media from Cloudinary:", error);
    return {
      photos: [],
      videos: [],
      web: [],
    };
  }
}

// Generate optimized URL for images
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
) {
  const {
    width = 800,
    height = 600,
    quality = "auto",
    format = "auto",
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop: "fill",
    quality,
    format,
    secure: true,
  });
}

// Generate video poster/thumbnail URL
export function getVideoPosterUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    time?: number; // Time in seconds for the frame to capture
  } = {}
) {
  const {
    width = 800,
    height = 600,
    quality = "auto",
    time = 0,
  } = options;

  return cloudinary.url(publicId, {
    resource_type: "video",
    format: "jpg",
    width,
    height,
    crop: "fill",
    quality,
    secure: true,
    start_offset: time,
  });
}

export default cloudinary;
