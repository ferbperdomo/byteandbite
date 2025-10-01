"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Mobile Footer */}
      <div className="md:hidden p-6 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-[#b65c25]">BYTE STUDIO</h3>
          <p className="text-gray-400 text-sm">{t("description")}</p>
        </div>

        <div className="flex justify-center mb-4">
          <a
            href="https://www.instagram.com/_bytestudio_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b65c25] hover:text-gray-400 transition-all duration-300 hover:scale-110"
            title="Follow us on Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} BYTE STUDIO. {t("copyright")}
        </p>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:flex justify-center">
        <div className="grid grid-cols-3 gap-8 p-8 max-w-4xl mx-auto">
          {/* Company Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4 text-[#b65c25]">
              BYTE STUDIO
            </h3>
            <p className="text-gray-400 text-sm mb-4">{t("description")}</p>
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/_bytestudio_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#b65c25] transition-all duration-300 hover:scale-110"
                title="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="text-center">
            <h4 className="text-md font-semibold mb-4 text-[#b65c25]">
              {t("services.title")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t("services.photography")}</li>
              <li>{t("services.videography")}</li>
              <li>{t("services.webDevelopment")}</li>
              <li>{t("services.branding")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-md font-semibold mb-4 text-[#b65c25]">
              {t("contact.title")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t("contact.email")}</li>
              <li>{t("contact.phone")}</li>
              <li>{t("contact.location")}</li>
              <li>{t("contact.hours")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Section */}
      <div className="hidden md:block border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} BYTE STUDIO. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
