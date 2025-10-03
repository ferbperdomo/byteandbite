import { generateFAQSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Byte Studio",
  description:
    "Find answers to common questions about our photography, videography, and web development services. Get to know Byte Studio's creative process and service offerings.",
  keywords:
    "FAQ, frequently asked questions, photography services, videography services, web development, Byte Studio, creative agency, New Jersey",
  openGraph: {
    title: "Frequently Asked Questions | Byte Studio",
    description:
      "Find answers to common questions about our photography, videography, and web development services.",
    type: "website",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const t = useTranslations("faq");

  // FAQ data for structured data
  const faqData = [
    {
      question: t("questions.q1"),
      answer: t("questions.a1"),
    },
    {
      question: t("questions.q2"),
      answer: t("questions.a2"),
    },
    {
      question: t("questions.q3"),
      answer: t("questions.a3"),
    },
  ];

  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#b65c25]">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#b65c25]">
                  {faq.question}
                </h2>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="bg-[#b65c25] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#a55220] transition-colors duration-300 inline-block"
            >
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
