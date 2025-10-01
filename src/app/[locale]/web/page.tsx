import WebGallery from "@/components/sections/WebGallery";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { getMediaByCategory } from "@/lib/media";

export default async function WebPage() {
  // Fetch all web development images
  const webImages = await getMediaByCategory("web");

  return (
    <div className="min-h-screen bg-black">
      <WebGallery webImages={webImages} />
      <ScrollToTopButton />
    </div>
  );
}
