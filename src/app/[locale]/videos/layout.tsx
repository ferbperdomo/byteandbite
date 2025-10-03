import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Production Services | Byte Studio",
  description:
    "Professional video production services. Dynamic video content that brings your brand to life. From promotional videos to social media content, we create engaging stories.",
  keywords:
    "video production, video marketing, promotional videos, social media videos, brand videos, video editing, content creation, Byte Studio",
  openGraph: {
    title: "Video Production Services | Byte Studio",
    description:
      "Professional video production services. Dynamic video content that brings your brand to life. From promotional videos to social media content.",
    type: "website",
    images: [
      {
        url: "/media/videos/thumbnails/vid_byte1.jpg",
        width: 1200,
        height: 630,
        alt: "Byte Studio Video Production Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Production Services | Byte Studio",
    description:
      "Professional video production services. Dynamic video content that brings your brand to life. From promotional videos to social media content.",
    images: ["/media/videos/thumbnails/vid_byte1.jpg"],
  },
  alternates: {
    canonical: "/videos",
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
