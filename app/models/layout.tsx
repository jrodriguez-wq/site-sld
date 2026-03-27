import type { Metadata } from "next";
import { CONTACT_INFO } from "@/config/contact";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "New Home Models in Southwest Florida — Standard Land Development",
  description:
    "Browse Standard Land Development's new construction home models in LaBelle and Lehigh Acres, Florida. 2–5 bedrooms. Starting from $200,000. Rent to Own available with $0 down. View floor plans and pricing.",
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
    description: "2–5 bedrooms. Starting from $200,000. Rent to Own with $0 down. LaBelle & Lehigh Acres.",
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
