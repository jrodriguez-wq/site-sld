import type { Metadata } from "next";
import { CONTACT_INFO } from "@/config/contact";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "New Home Models in Southwest Florida — Standard Land Development",
  description:
    "Browse Standard Land Development new-construction floor plans in LaBelle and Lehigh Acres, Florida. 2–5 bedrooms. Model photography — not street listings.",
  keywords: [
    ...getLocalKeywords().slice(0, 15),
    ...getServiceKeywords().slice(0, 10),
    "home models Southwest Florida",
    "new construction floor plans",
    "affordable home models Florida",
    "Standard Land Development models",
  ],
  alternates: { canonical: `${siteUrl}/models` },
  openGraph: {
    title: "New Home Models in Southwest Florida | Standard Land Development",
    description: "2–5 bedrooms. New construction floor plans in LaBelle and Lehigh Acres.",
    url: `${siteUrl}/models`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Home Models" }],
  },
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
