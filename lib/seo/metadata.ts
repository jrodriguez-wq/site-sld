import type { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";

type OpenGraphType = "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: OpenGraphType;
    image?: string;
  };
}

export const generateMetadata = (options: GenerateMetadataOptions): Metadata => {
  const {
    title,
    description,
    canonical,
    keywords = [],
    openGraph,
  } = options;

  return {
    title: `${title} | ${SEO_CONFIG.siteName}`,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    alternates: {
      canonical: canonical || SEO_CONFIG.siteUrl,
    },
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || canonical || SEO_CONFIG.siteUrl,
      siteName: SEO_CONFIG.siteName,
      type: (openGraph?.type || "website") as OpenGraphType,
      images: openGraph?.image ? [{ url: openGraph.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph?.title || title,
      description: openGraph?.description || description,
    },
  };
};

export const generatePropertyMetadata = (
  propertyName: string,
  description: string,
  imageUrl?: string,
  price?: string
): Metadata => {
  const title = `${propertyName}${price ? ` - ${price}` : ""} | ${SEO_CONFIG.siteName}`;

  return generateMetadata({
    title: propertyName,
    description,
    canonical: `${SEO_CONFIG.siteUrl}/models/${propertyName.toLowerCase().replace(/\s+/g, "-")}`,
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/models/${propertyName.toLowerCase().replace(/\s+/g, "-")}`,
      type: "website",
      image: imageUrl,
    },
  });
};
