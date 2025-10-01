"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Byte Studio</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Byte Studio's homepage or contact us for assistance."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          property="og:title"
          content="404 - Page Not Found | Byte Studio"
        />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist. Return to Byte Studio's homepage or contact us for assistance."
        />
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
            const particleClass = `particle-${(i % 17) + 1}`;
            return (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-[#b65c25]/30 rounded-full animate-bounce ${particleClass}`}
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
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              The page you&apos;re looking for seems to have vanished into the
              digital void. Don&apos;t worry, even the best photographers miss a
              shot sometimes!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-[#b65c25] to-[#d97316] text-white rounded-2xl font-semibold shadow-2xl hover:shadow-[#b65c25]/30 transition-all duration-300 hover:scale-105 hover:brightness-110">
                🏠 Go Home
              </button>
            </Link>
            <Link href="/en/contact">
              <button className="px-8 py-4 bg-transparent border-2 border-[#b65c25] text-[#b65c25] rounded-2xl font-semibold hover:bg-[#b65c25] hover:text-white transition-all duration-300 hover:scale-105">
                📞 Contact Us
              </button>
            </Link>
          </div>

          {/* Fun Message */}
          <div className="mt-12 animate-fade-in">
            <p className="text-gray-400 text-sm">
              &ldquo;Every great photographer knows that sometimes the best
              shots are the ones you didn&apos;t plan for.&rdquo;
              <br />
              <span className="text-[#b65c25]">- Byte Studio Team</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
