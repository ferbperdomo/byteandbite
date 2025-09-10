import WebGallery from "@/components/sections/WebGallery";
import { getAllMediaByCategory } from "@/lib/cloudinary";

export default async function WebPage() {
  // Fetch all web development images
  const media = await getAllMediaByCategory();
  const webImages = media.web || [];

  return (
    <div className="min-h-screen bg-black">
      <WebGallery webImages={webImages} />
    </div>
  );
}
