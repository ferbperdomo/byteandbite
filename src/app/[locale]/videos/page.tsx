import VideoGallery from "@/components/sections/VideoGallery";
import { getAllMediaByCategory } from "@/lib/cloudinary";

export default async function VideosPage() {
  // Fetch all videos
  const media = await getAllMediaByCategory();
  const videos = media.videos || [];

  return (
    <div className="min-h-screen bg-black">
      <VideoGallery videos={videos} />
    </div>
  );
}
