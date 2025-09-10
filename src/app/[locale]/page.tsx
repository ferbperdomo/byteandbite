// import Gallery from "@/components/sections/Gallery";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  // Fetch media data for services section (limited to 3 items per category)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const [photosRes, videosRes, webRes, brandingRes] = await Promise.all([
    fetch(`${baseUrl}/api/media?category=photos&limit=3`),
    fetch(`${baseUrl}/api/media?category=videos&limit=3`),
    fetch(`${baseUrl}/api/media?category=web&limit=3`),
    fetch(`${baseUrl}/api/media?category=branding&limit=3`),
  ]);

  const [photos, videos, web, branding] = await Promise.all([
    photosRes.json(),
    videosRes.json(),
    webRes.json(),
    brandingRes.json(),
  ]);

  const servicesMedia = {
    photos: photos.media || [],
    videos: videos.media || [],
    web: web.media || [],
    branding: branding.media || [],
  };

  return (
    <main className="bg-black text-white">
      <HeroSection />
      <ServicesSection media={servicesMedia} />
      {/* <Gallery /> */}
    </main>
  );
}
