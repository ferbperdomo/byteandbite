"use client";

import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t("title")} | Byte Studio</title>
        <meta name="description" content={t("description")} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={`${t("title")} | Byte Studio`} />
        <meta property="og:description" content={t("description")} />
        <meta property="og:type" content="website" />
      </Head>
      <main
        className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
        role="main"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b65c25]/5 via-transparent to-[#b65c25]/5 animate-pulse" />

        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const positions = [
              { left: 10, top: 20 },
              { left: 30, top: 15 },
              { left: 50, top: 25 },
              { left: 70, top: 18 },
              { left: 90, top: 22 },
              { left: 15, top: 40 },
              { left: 35, top: 45 },
              { left: 55, top: 38 },
              { left: 75, top: 42 },
              { left: 85, top: 35 },
              { left: 20, top: 60 },
              { left: 40, top: 65 },
              { left: 60, top: 58 },
              { left: 80, top: 62 },
              { left: 95, top: 55 },
            ];
            const pos = positions[i] || { left: 50, top: 50 };
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#b65c25]/30 rounded-full animate-bounce"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Image
              src="/media/assets/logos/bytelogo.png"
              alt="Byte Studio Logo"
              width={120}
              height={120}
              className="mx-auto animate-pulse"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>

          {/* 404 Number */}
          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-8xl md:text-9xl font-bold text-[#b65c25] mb-4 relative animate-pulse">
              <span className="inline-block drop-shadow-[0_0_20px_#b65c25]">
                404
              </span>
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-4 bg-gradient-to-r from-[#b65c25] to-[#d97316] text-white rounded-2xl font-semibold shadow-2xl hover:shadow-[#b65c25]/30 transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              🏠 {t("goHome")}
            </button>

            <button
              onClick={() => router.push("/en/contact")}
              className="px-8 py-4 bg-transparent border-2 border-[#b65c25] text-[#b65c25] rounded-2xl font-semibold hover:bg-[#b65c25] hover:text-white transition-all duration-300 hover:scale-105"
            >
              📞 {t("contactUs")}
            </button>
          </div>

          {/* Fun Message */}
          <div className="mt-12 animate-fade-in">
            <p className="text-gray-400 text-sm">
              {t("quote")}
              <br />
              <span className="text-[#b65c25]">- {t("team")}</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
