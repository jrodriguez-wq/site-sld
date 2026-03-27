import type { Metadata } from "next";
import { RentToOwn } from "@/components/sections/rent-to-own";
import { PageHero } from "@/components/ui/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Rent to Own Program — $0 Down New Homes in Florida | Standard Land Development",
  description:
    "Standard Land Development's Rent to Own program lets you move into a new home in Southwest Florida with $0 down payment. Build equity while you rent. Flexible 1–5 year plans. No HOA. Affordable homeownership for American families.",
  alternates: { canonical: `${siteUrl}/programs` },
  openGraph: {
    title: "Rent to Own Program — $0 Down New Homes in Florida | Standard Land Development",
    description: "$0 down payment. New construction. Build equity while you rent. No HOA. Southwest Florida.",
    url: `${siteUrl}/programs`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rent to Own Program — SLD" }],
  },
};

export default function ProgramsPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: siteUrl },
      { name: "Programs", url: `${siteUrl}/programs` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rent to Own Program",
      serviceType: "Rent to Own Housing Program",
      provider: { "@type": "Organization", name: "Standard Land Development", url: siteUrl },
      description:
        "Move into a brand new home in Southwest Florida with $0 down payment. Flexible 1–5 year Rent to Own plans. Build equity while you live. No HOA fees. Available in LaBelle and Lehigh Acres.",
      areaServed: [
        { "@type": "City", name: "LaBelle", containedInPlace: { "@type": "State", name: "Florida" } },
        { "@type": "City", name: "Lehigh Acres", containedInPlace: { "@type": "State", name: "Florida" } },
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "$0 down payment to start your Rent to Own journey",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/programs`,
      },
      url: `${siteUrl}/programs`,
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageHero
        title="Our Programs"
        subtitle="Rent to Own"
        description="Explore our Rent to Own program. Pioneers in making homeownership accessible."
        backgroundImage="/houses/3941/principal.webp"
        badge="Homeownership Programs"
      />
      <div id="rent-to-own" className="scroll-mt-20 sm:scroll-mt-24">
        <RentToOwn />
      </div>
    </>
  );
}
