// import Gallery from "@/components/sections/Gallery";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { getMediaWithLimit } from "@/lib/media";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  // Fetch media data for services section (limited to 3 items per category)
  const mediaData = await getMediaWithLimit(3);

  const servicesMedia = {
    photos: mediaData.photography || [],
    videos: mediaData.videos || [],
    web: mediaData.web || [],
    branding: [],
  };

  return (
    <main className="bg-black text-white">
      <HeroSection />
      <ServicesSection media={servicesMedia} />
      {/* <Gallery /> */}
    </main>
  );
}
