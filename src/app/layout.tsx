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
  other: {
    preload: "/media/images/hero/hero-image.jpg as image",
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
        url: "/media/assets/logos/bytelogo.png",
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
    images: ["/media/assets/logos/bytelogo.png"],
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
    icon: "/bytestudio.png",
    shortcut: "/bytestudio.png",
    apple: "/bytestudio.png",
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
      </head>
      <body className="overflow-x-hidden bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Byte Studio",
              alternateName: "Byte & Bite Media",
              description:
                "Professional photography, videography, and web development services. Creative marketing agency specializing in visual content and digital experiences.",
              url: "https://byteandbite-omega.vercel.app",
              logo: {
                "@type": "ImageObject",
                url: "https://byteandbite-omega.vercel.app/media/assets/logos/bytelogo.png",
                width: 200,
                height: 100,
              },
              image:
                "https://byteandbite-omega.vercel.app/media/assets/logos/bytelogo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-908-376-8351",
                contactType: "customer service",
                email: "admin@byteandbitemedia.com",
                availableLanguage: ["English", "Spanish"],
                areaServed: "US",
              },
              sameAs: [
                "https://www.instagram.com/_bytestudio_",
                "https://byteandbite-omega.vercel.app",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "New Jersey",
                addressRegion: "NJ",
                addressCountry: "US",
              },
              foundingDate: "2024",
              numberOfEmployees: "2-10",
              service: [
                {
                  "@type": "Service",
                  name: "Professional Photography",
                  description:
                    "Food, beverage, and commercial photography services",
                  provider: {
                    "@type": "Organization",
                    name: "Byte Studio",
                  },
                  areaServed: "United States",
                  serviceType: "Photography",
                },
                {
                  "@type": "Service",
                  name: "Video Production",
                  description:
                    "Professional video production and editing services for marketing and social media",
                  provider: {
                    "@type": "Organization",
                    name: "Byte Studio",
                  },
                  areaServed: "United States",
                  serviceType: "Video Production",
                },
                {
                  "@type": "Service",
                  name: "Web Development",
                  description:
                    "Custom website development, e-commerce solutions, and web applications",
                  provider: {
                    "@type": "Organization",
                    name: "Byte Studio",
                  },
                  areaServed: "United States",
                  serviceType: "Web Development",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Creative Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Photography Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Video Production Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Web Development Services",
                    },
                  },
                ],
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
