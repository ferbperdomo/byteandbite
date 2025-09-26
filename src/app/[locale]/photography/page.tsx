import PhotographyGallery from "@/components/sections/PhotographyGallery";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { getAllMediaByCategory } from "@/lib/cloudinary";

export default async function PhotographyPage() {
  // Fetch all photography images
  const media = await getAllMediaByCategory();
  const photos = media.photos || [];

  return (
    <div className="min-h-screen bg-black">
      <PhotographyGallery photos={photos} />
      <ScrollToTopButton />
    </div>
  );
}
