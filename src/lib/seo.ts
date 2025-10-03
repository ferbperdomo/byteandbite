// SEO utility functions and configurations

export const seoConfig = {
  siteName: "Byte Studio",
  siteUrl: "https://byteandbite-omega.vercel.app",
  defaultTitle: "Byte Studio - Creative Marketing Agency",
  defaultDescription:
    "Professional photography, videography, and web development services. Capturing moments, creating stories, building digital experiences.",
  defaultKeywords: [
    "photography",
    "videography",
    "web development",
    "creative agency",
    "marketing",
    "Byte Studio",
    "visual content",
    "digital experiences",
    "brand storytelling",
    "commercial photography",
    "video production",
    "website design",
    "New Jersey",
    "professional services",
  ],
  social: {
    instagram: "https://www.instagram.com/_bytestudio_",
    email: "admin@byteandbitemedia.com",
    phone: "+1 (908) 376-8351",
  },
  contact: {
    email: "admin@byteandbitemedia.com",
    phone: "+1 (908) 376-8351",
    location: "New Jersey, United States",
  },
};

// Generate structured data for services
export const generateServiceSchema = (service: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Byte Studio",
      url: seoConfig.siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: seoConfig.contact.phone,
        email: seoConfig.contact.email,
        contactType: "customer service",
      },
    },
    areaServed: "United States",
    serviceType: service,
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  };
};

// Generate FAQ schema
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Generate local business schema
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seoConfig.siteUrl}/#organization`,
    name: "Byte Studio",
    alternateName: "Byte & Bite Media",
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/media/assets/logos/bytelogo.png`,
    image: `${seoConfig.siteUrl}/media/assets/logos/bytelogo.png`,
    telephone: seoConfig.contact.phone,
    email: seoConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Jersey",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.2206",
      longitude: "-74.7597",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "40.2206",
        longitude: "-74.7597",
      },
      geoRadius: "100000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photography Services",
            description:
              "Professional photography for food, beverage, and commercial use",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Video Production Services",
            description: "Professional video production and editing services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development Services",
            description: "Custom website development and web applications",
          },
        },
      ],
    },
    sameAs: [seoConfig.social.instagram, seoConfig.siteUrl],
  };
};
