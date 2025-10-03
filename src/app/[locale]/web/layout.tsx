import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services | Byte Studio",
  description:
    "Professional web development services. Modern, responsive websites that drive results. Custom web applications, e-commerce solutions, and digital experiences.",
  keywords:
    "web development, website design, custom websites, responsive design, e-commerce, web applications, digital marketing, Byte Studio",
  openGraph: {
    title: "Web Development Services | Byte Studio",
    description:
      "Professional web development services. Modern, responsive websites that drive results.",
    type: "website",
    images: [
      {
        url: "/media/images/web/clonetflix.png",
        width: 1200,
        height: 630,
        alt: "Byte Studio Web Development Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services | Byte Studio",
    description:
      "Professional web development services. Modern, responsive websites that drive results.",
    images: ["/media/images/web/clonetflix.png"],
  },
  alternates: {
    canonical: "/web",
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return children;
}
