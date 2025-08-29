import Gallery from "@/components/sections/Gallery";
import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/ui/Navbar";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <Navbar />
      <main className="bg-black text-white overflow-x-hidden max-w-full">
        <HeroSection />
        <div className="h-24 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <Gallery />
      </main>
    </>
  );
}
