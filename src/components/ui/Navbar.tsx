"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const actualPathname = window.location.pathname;
    const locale = actualPathname.split("/")[1];

    if (locale === "en" || locale === "es") {
      setCurrentLocale(locale);
    }

    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 300);
  }, [pathname]);

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";
    setCurrentLocale(newLocale);
    const newPath = `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <nav className="relative w-full z-50 bg-black pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className={`flex items-center relative ${
              isLoaded
                ? "animate-logo-appear"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <Image
              src="https://res.cloudinary.com/dzmjezjhd/image/upload/v1756726417/byteandbitemedianobg_f47g5u.png"
              alt="Byte & Bite"
              width={120}
              height={60}
              className="h-36 w-auto relative invert brightness-100 z-10"
              priority
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {t("services")}
            </Link>
            <Link
              href="#faq"
              className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {t("faq")}
            </Link>
            <button
              onClick={toggleLanguage}
              className={`ml-4 bg-transparent text-white border border-white px-4 py-2 rounded-md text-xs font-medium hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <span className="inline-block transition-transform duration-300 hover:rotate-12 flex items-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span className="ml-1 font-bold">
                {currentLocale === "en" ? "ES" : "EN"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent border-none text-white text-2xl cursor-pointer p-2 transition-all duration-300 hover:scale-125 hover:rotate-90 hover:bg-white/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm px-8 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#services"
              className="text-white no-underline text-base font-medium hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("services")}
            </Link>
            <Link
              href="#faq"
              className="text-white no-underline text-base font-medium hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("faq")}
            </Link>
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="bg-transparent text-white border border-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer self-start hover:bg-white hover:text-black transition-all duration-300 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {currentLocale === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
