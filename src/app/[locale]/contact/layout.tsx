import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Byte Studio | Get In Touch",
  description:
    "Ready to bring your vision to life? Contact Byte Studio for professional photography, videography, and web development services. Let's create something amazing together.",
  keywords:
    "contact Byte Studio, photography services, videography services, web development, creative agency, New Jersey, professional services",
  openGraph: {
    title: "Contact Byte Studio | Get In Touch",
    description:
      "Ready to bring your vision to life? Contact Byte Studio for professional photography, videography, and web development services.",
    type: "website",
    images: [
      {
        url: "/media/assets/logos/bytelogo.png",
        width: 1200,
        height: 630,
        alt: "Contact Byte Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Byte Studio | Get In Touch",
    description:
      "Ready to bring your vision to life? Contact Byte Studio for professional photography, videography, and web development services.",
    images: ["/media/assets/logos/bytelogo.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
