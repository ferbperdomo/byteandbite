import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Photography Services | Byte Studio",
  description:
    "Professional photography services for food, beverage, and commercial photography. High-quality visual content that captures your brand's essence and drives engagement.",
  keywords:
    "professional photography, food photography, commercial photography, brand photography, product photography, visual content, Byte Studio",
  openGraph: {
    title: "Professional Photography Services | Byte Studio",
    description:
      "Professional photography services for food, beverage, and commercial photography. High-quality visual content that captures your brand's essence.",
    type: "website",
    images: [
      {
        url: "/media/images/photography/byte1.jpg",
        width: 1200,
        height: 630,
        alt: "Byte Studio Photography Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Photography Services | Byte Studio",
    description:
      "Professional photography services for food, beverage, and commercial photography. High-quality visual content that captures your brand's essence.",
    images: ["/media/images/photography/byte1.jpg"],
  },
  alternates: {
    canonical: "/photography",
  },
};

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
