import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Byte Studio - Creative Marketing Agency",
    template: "%s | Byte Studio",
  },
  description:
    "Professional photography, videography, and web development services. Capturing moments, creating stories, building digital experiences.",
  keywords:
    "photography, videography, web development, creative agency, marketing, Byte Studio",
  authors: [{ name: "Byte Studio" }],
  creator: "Byte Studio",
  publisher: "Byte Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://byteandbite-omega.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://byteandbite-omega.vercel.app",
    siteName: "Byte Studio",
    title: "Byte Studio - Creative Marketing Agency",
    description:
      "Professional photography, videography, and web development services.",
    images: [
      {
        url: "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
        width: 1200,
        height: 630,
        alt: "Byte Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Studio - Creative Marketing Agency",
    description:
      "Professional photography, videography, and web development services.",
    images: [
      "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="overflow-x-hidden bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Byte Studio",
              description:
                "Professional photography, videography, and web development services",
              url: "https://byteandbite-omega.vercel.app",
              logo: "https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-XXX-XXX-XXXX",
                contactType: "customer service",
                email: "admin@byteandbitemedia.com",
              },
              sameAs: ["https://byteandbite-omega.vercel.app"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              service: [
                {
                  "@type": "Service",
                  name: "Photography Services",
                  description:
                    "Professional photography for events, portraits, and commercial use",
                },
                {
                  "@type": "Service",
                  name: "Videography Services",
                  description:
                    "Professional video production and editing services",
                },
                {
                  "@type": "Service",
                  name: "Web Development",
                  description:
                    "Custom website development and web applications",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
