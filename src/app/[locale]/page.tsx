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
      <main className="bg-black text-white">
        <HeroSection />
      </main>
    </>
  );
}
