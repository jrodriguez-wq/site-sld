import type { Metadata } from "next";
import { BusinessModel } from "@/components/sections/business-model";
import { PageHero } from "@/components/ui/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Our Mission & Business Model — Affordable Homes | Standard Land Development",
  description:
    "Standard Land Development's mission: make home ownership accessible for American families. Real property-backed development across Southwest Florida. High-demand urban projects in LaBelle, Lehigh Acres, and beyond.",
  alternates: { canonical: `${siteUrl}/business-model` },
  openGraph: {
    title: "Our Mission & Business Model | Standard Land Development",
    description: "Real property-backed development. High-demand urban projects in Southwest Florida. Accessible home ownership for American families.",
    url: `${siteUrl}/business-model`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Mission" }],
  },
};

export default function BusinessModelPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Our Mission", url: `${siteUrl}/business-model` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Our Mission"
        subtitle="Building Affordable Homes for American Families"
        description="We develop high-demand urban projects across South Florida. Real property-backed, community-focused."
        backgroundImage="/houses/713/principal.webp"
        badge="Our Mission"
      />
      <div id="business-model" className="scroll-mt-20 sm:scroll-mt-24">
        <BusinessModel />
      </div>
    </>
  );
}
