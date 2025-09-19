import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Byte Studio",
  description:
    "Get in touch with Byte Studio for professional photography, videography, and web development services. Let's create something amazing together.",
  keywords:
    "contact, photography services, videography, web development, Byte Studio, creative agency",
  openGraph: {
    title: "Contact Us | Byte Studio",
    description:
      "Get in touch with Byte Studio for professional creative services. Let's create something amazing together.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Byte Studio",
    description:
      "Get in touch with Byte Studio for professional creative services.",
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
  return <>{children}</>;
}
