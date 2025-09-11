"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
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

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";
    setCurrentLocale(newLocale);
    // Keep current path but change locale
    router.push(pathname, { locale: newLocale });
  };

  return (
    <nav className="relative w-full bg-black my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className={`flex items-center relative ${
              isLoaded
                ? "animate-logo-appear"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="https://res.cloudinary.com/dzmjezjhd/image/upload/v1757496139/Branvision_nlcq0d.png"
                alt="Byte & Bite"
                width={120}
                height={60}
                className="h-12 w-auto relative z-10"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${currentLocale}#services`}
              className={`text-[#b65c25] hover:text-[#a55220] px-3 py-2 text-md font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] delay-[400ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              onClick={(e) => {
                e.preventDefault();
                // If we're on the home page, scroll to services
                if (pathname === "/" || pathname === `/${currentLocale}`) {
                  document.getElementById("services")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  // If we're on another page, navigate to home with services anchor
                  router.push("/#services");
                }
              }}
            >
              {t("services")}
            </Link>
            <Link
              href={currentLocale === "es" ? "/fotografias" : "/photography"}
              className={`text-[#b65c25] hover:text-[#a55220] px-3 py-2 text-md font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] delay-[500ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t("photoGallery")}
            </Link>
            <Link
              href="/videos"
              className={`text-[#b65c25] hover:text-[#a55220] px-3 py-2 text-md font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] delay-[600ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t("videoGallery")}
            </Link>
            <Link
              href="/web"
              className={`text-[#b65c25] hover:text-[#a55220] px-3 py-2 text-md font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] delay-[650ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t("webGallery")}
            </Link>
            <Link
              href={currentLocale === "es" ? "/preguntas-frecuentes" : "/faq"}
              className={`text-[#b65c25] hover:text-[#a55220] px-3 py-2 text-md font-medium transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] delay-[700ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t("faq")}
            </Link>
            <button
              onClick={toggleLanguage}
              className={`ml-4 bg-transparent text-[#b65c25] px-4 py-2 rounded-md text-sm font-medium hover:text-[#a55220] transition-all duration-500 hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_8px_rgba(182,92,37,0.3)] active:scale-95 flex items-center justify-center delay-[800ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="flex items-center transition-transform duration-300 hover:rotate-12">
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
              <span className="ml-1 font-medium">
                {currentLocale === "en" ? "ES" : "EN"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`bg-transparent border-none text-[#b65c25] text-2xl cursor-pointer p-2 transition-all duration-500 hover:scale-110 hover:rotate-90 hover:bg-[#b65c25]/10 rounded-lg hover:shadow-[0_0_20px_rgba(182,92,37,0.4)] delay-[1000ms] ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-8 h-8 relative">
                {/* Hamburger lines */}
                <span
                  className={`absolute left-0 top-1 w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-3" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-1 w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-3" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md md:hidden z-50 flex items-center justify-center">
          {/* Close button */}
          <motion.button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-[#b65c25] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-8 h-8"
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
          </motion.button>

          <div className="flex flex-col items-center gap-8 text-center px-8">
            <Link
              href={`/${currentLocale}#services`}
              className="text-[#b65c25] no-underline text-lg font-medium hover:text-[#a55220] transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                // If we're on the home page, scroll to services
                if (pathname === "/" || pathname === `/${currentLocale}`) {
                  document.getElementById("services")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  // If we're on another page, navigate to home with services anchor
                  router.push("/#services");
                }
              }}
            >
              {t("services")}
            </Link>
            <Link
              href={currentLocale === "es" ? "/fotografias" : "/photography"}
              className="text-[#b65c25] no-underline text-lg font-medium hover:text-[#a55220] transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("photoGallery")}
            </Link>
            <Link
              href="/videos"
              className="text-[#b65c25] no-underline text-lg font-medium hover:text-[#a55220] transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("videoGallery")}
            </Link>
            <Link
              href="/web"
              className="text-[#b65c25] no-underline text-lg font-medium hover:text-[#a55220] transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("webGallery")}
            </Link>
            <Link
              href={currentLocale === "es" ? "/preguntas-frecuentes" : "/faq"}
              className="text-[#b65c25] no-underline text-lg font-medium hover:text-[#a55220] transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("faq")}
            </Link>
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="bg-transparent text-[#b65c25] px-6 py-3 rounded-lg text-lg font-medium cursor-pointer hover:text-[#a55220] transition-all duration-300 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 mr-2"
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
