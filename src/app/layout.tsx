import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte & Bite - Creative Marketing Agency",
  description: "Capturing moments, creating stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      <body>{children}</body>
    </html>
  );
}
