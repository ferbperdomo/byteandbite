"use client";

import InteractiveFirmament from "@/components/ui/InteractiveFirmament";
import { CloudinaryResource } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ServicesSectionProps {
  media: {
    photos: CloudinaryResource[];
    videos: CloudinaryResource[];
    web: CloudinaryResource[];
    branding: CloudinaryResource[];
  };
}

export default function ServicesSection({ media }: ServicesSectionProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const services = [
    {
      key: "photography",
      media: media.photos.slice(0, 3),
      href: `/${currentLocale}/photography`,
    },
    {
      key: "videography",
      media: media.videos.slice(0, 3),
      href: `/${currentLocale}/videos`,
    },
    {
      key: "webDevelopment",
      media: media.web.slice(0, 3),
      href: `/${currentLocale}/web`,
    },
    // {
    //   key: "branding",
    //   media: media.branding.slice(0, 3),
    //   href: `/${currentLocale}/branding`,
    // },
  ];

  return (
    <InteractiveFirmament className="py-24 px-6">
      <section id="services" className="text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#b65c25]">
              {t("services.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t("services.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
            {services.map((service, index) => (
              <ServiceCard
                key={service.key}
                service={service}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>
    </InteractiveFirmament>
  );
}

interface ServiceCardProps {
  service: {
    key: string;
    media: CloudinaryResource[];
    href: string;
  };
  index: number;
  isVisible: boolean;
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  const serviceData = t.raw(`services.${service.key}`) as {
    title: string;
    description: string;
  };

  return (
    <Link href={service.href} className="block">
      <motion.div
        className="group relative flex flex-col h-full cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-80 rounded-lg overflow-hidden mb-6 flex-shrink-0">
          {/* Media Stack */}
          <div className="absolute inset-0 flex items-center justify-center">
            {service.media.map((item, itemIndex) => (
              <motion.div
                key={item.public_id}
                className="absolute w-52 h-52 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-lg"
                initial={{
                  x: (itemIndex - 1) * 20,
                  y: (itemIndex - 1) * -15,
                  rotate: (itemIndex - 1) * 5,
                  scale: 1.05,
                  zIndex: service.media.length - itemIndex,
                }}
                animate={
                  isHovered
                    ? {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        zIndex: service.media.length - itemIndex,
                      }
                    : {
                        x: (itemIndex - 1) * 20,
                        y: (itemIndex - 1) * -15,
                        rotate: (itemIndex - 1) * 5,
                        scale: 1.05,
                        zIndex: service.media.length - itemIndex,
                      }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {item.resource_type === "video" ? (
                  <video
                    src={item.secure_url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                    poster={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/so_0/${item.public_id}.jpg`}
                  />
                ) : (
                  <Image
                    src={item.secure_url}
                    alt={`${serviceData.title} sample`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="text-center flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#b65c25] transition-colors duration-300">
            {serviceData.title}
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
            {serviceData.description}
          </p>
          <div className="mt-auto">
            <div className="inline-block bg-[#b65c25] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-[#a55220] hover:scale-105">
              {t("services.viewPortfolio")}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
