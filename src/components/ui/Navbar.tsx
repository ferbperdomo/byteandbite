"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState("en");
  const [scrolled, setScrolled] = useState(false);

  // Detect current locale from pathname
  useEffect(() => {
    // Use window.location.pathname to get the actual URL
    const actualPathname = window.location.pathname;
    const locale = actualPathname.split("/")[1];

    if (locale === "en" || locale === "es") {
      setCurrentLocale(locale);
    }
  }, [pathname]);

  // Handle scroll effect
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

    // Simply construct the new path
    const newPath = `/${newLocale}`;

    // Use router.push with the correct path
    router.push(newPath);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/byteandbitelogo.png"
            alt="Byte & Bite"
            style={{
              height: "120px",
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a
            href="#services"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.opacity = "1";
            }}
          >
            {t("services")}
          </a>
          <a
            href="#faq"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.opacity = "1";
            }}
          >
            {t("faq")}
          </a>
          <button
            onClick={toggleLanguage}
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid #ffffff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "#ffffff";
              target.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "transparent";
              target.style.color = "#ffffff";
            }}
          >
            {currentLocale === "en" ? "ES" : "EN"}
          </button>
        </div>

        {/* Mobile menu button */}
        <div style={{ display: "none" }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "1rem 2rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <a
              href="#services"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("services")}
            </a>
            <a
              href="#faq"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("faq")}
            </a>
            <button
              onClick={toggleLanguage}
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid #ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              {currentLocale === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
