import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services | Byte Studio",
  description:
    "Professional web development services with modern technologies. Custom websites, e-commerce solutions, and web applications built with React, Next.js, and cutting-edge frameworks.",
  keywords:
    "web development, custom websites, e-commerce, React, Next.js, web applications, Byte Studio",
  openGraph: {
    title: "Web Development Services | Byte Studio",
    description:
      "Professional web development services with modern technologies. Custom websites, e-commerce solutions, and web applications.",
    type: "website",
    url: "/web",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services | Byte Studio",
    description:
      "Professional web development services with modern technologies.",
  },
  alternates: {
    canonical: "/web",
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
