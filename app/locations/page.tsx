import type { Metadata } from "next";
import { Locations } from "@/components/sections/locations";
import { PageHero } from "@/components/ui/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "New Home Locations in Southwest Florida — LaBelle, Lehigh Acres | Standard Land Development",
  description:
    "Standard Land Development builds new affordable homes across Southwest Florida. Active communities in LaBelle (Hendry County), Lehigh Acres (Lee County), Fort Myers, Cape Coral, Naples, Immokalee, and Clewiston.",
  alternates: { canonical: `${siteUrl}/locations` },
  openGraph: {
    title: "New Home Locations in Southwest Florida | Standard Land Development",
    description: "Active communities in LaBelle, Lehigh Acres, Fort Myers, Cape Coral, Naples, and more.",
    url: `${siteUrl}/locations`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Locations — Southwest Florida" }],
  },
};

export default function LocationsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Locations", url: `${siteUrl}/locations` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Our Locations"
        subtitle="Building Across South Florida"
        description="Explore our development locations in South Florida. We develop projects in Palm Beach, Broward, Hendry, Glades, Collier and Lee counties."
        backgroundImage="/houses/3711/principal.webp"
        badge="Where We Build"
      />
      <div id="locations" className="scroll-mt-28">
        <Locations />
      </div>
    </>
  );
}
