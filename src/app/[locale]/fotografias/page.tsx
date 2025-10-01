import PhotographyGallery from "@/components/sections/PhotographyGallery";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { getMediaByCategory } from "@/lib/media";

export default async function FotografiasPage() {
  // Fetch all photography images
  const photos = await getMediaByCategory("photography");

  return (
    <div className="min-h-screen bg-black">
      <PhotographyGallery photos={photos} />
      <ScrollToTopButton />
    </div>
  );
}
