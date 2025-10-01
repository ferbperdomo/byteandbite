import VideoGallery from "@/components/sections/VideoGallery";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { getMediaByCategory } from "@/lib/media";

export default async function VideosPage() {
  // Fetch all videos
  const videos = await getMediaByCategory("videos");

  return (
    <div className="min-h-screen bg-black">
      <VideoGallery videos={videos} />
      <ScrollToTopButton />
    </div>
  );
}
