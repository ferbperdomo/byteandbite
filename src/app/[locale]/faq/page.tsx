"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700`}
          >
            {t("title")}
          </h1>
          <p
            className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700 delay-200`}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-white">
                {faq.question}
              </h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div
          className={`text-center mt-12 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } transition-all duration-700 delay-500`}
        >
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-300 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
