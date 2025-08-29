import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/ui/Navbar";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <main style={{ backgroundColor: "#000000", color: "#ffffff" }}>
      <Navbar />
      <HeroSection />
    </main>
  );
}
