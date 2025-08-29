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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const actualPathname = window.location.pathname;
    const locale = actualPathname.split("/")[1];

    if (locale === "en" || locale === "es") {
      setCurrentLocale(locale);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";
    setCurrentLocale(newLocale);
    const newPath = `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 py-4 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="/byteandbitelogo.png"
              alt="Byte & Bite"
              width={120}
              height={60}
              className="h-12 w-auto brightness-0 invert"
              priority
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              {t("services")}
            </Link>
            <Link
              href="#faq"
              className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              {t("faq")}
            </Link>
            <button
              onClick={toggleLanguage}
              className="ml-4 bg-transparent text-white border border-white px-4 py-2 rounded-md text-xs font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              {currentLocale === "en" ? "ES" : "EN"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent border-none text-white text-2xl cursor-pointer p-2"
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
              className="bg-transparent text-white border border-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer self-start hover:bg-white hover:text-black transition-all duration-300"
            >
              {currentLocale === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
