import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte & Bite - Creative Marketing Agency",
  description: "Capturing moments, creating stories.",
  icons: {
    icon: "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
    shortcut:
      "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
    apple:
      "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="overflow-x-hidden bg-black">{children}</body>
    </html>
  );
}
